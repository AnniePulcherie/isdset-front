import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import SidebarEtudiant from './SidebarEtudiant';
import axios from 'axios';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { setModuleSemestre } from '../../app/modulesReducer';

const DashboardEtudiant = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const etudiant = useSelector((state)=>state.inscription);
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [filiere, setFiliere] = useState(null);
  const [message, setMessage] = useState('');
  
  const [imageURL, setImageURL] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listeFormation,setListeFormation] = useState([]);

  const getInscriptionFormation = async () => {
    try {
      console.log(etudiant);
      const reponse = await axios.get(`${apiURL}inscription/formation/${etudiant.id}`);
      console.log(reponse.data);
      if(reponse.data.length >0){
        setListeFormation(reponse.data);
      }else{
        navigate('/choisir-type');
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  //dispatch(setModuleSemestre(modules));
  const getFiliere = async () => {
    
    try {
      
      const response = await axios.get(`${apiURL}etudiant/filiere/${etudiant.id}`);
      
      setFiliere(response.data.filiere);
      setMessage(response.data.message);
      console.log(response.data.module);
      console.log('reponse', response.data);
      dispatch(setModuleSemestre(response.data.module));
    
    } catch (error) {
      console.error('Erreur lors de la récupération de la filière :', error);
    }
  };

  useEffect(() => {
    if (!etudiant) {
      navigate('/accueil');
    }
    getInscriptionFormation();
    getFiliere();
    console.log(listeFormation);
  }, [etudiant]);

  const handleDownloadPDF = (pdfFilename) => {
    const downloadURL = `${apiURL}download/${pdfFilename}`;

    fetch(downloadURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement du fichier');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', pdfFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Erreur de téléchargement :', error.message);
      });
  };

  return (
    <div>
      <Header />
      <SidebarEtudiant />

      <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
        <div className="pagetitle">
          <h1>Dashboard </h1>
         
        </div>
        <div>
        {message &&(
          <span>{message}</span>
        )}
          {listeFormation && listeFormation.map((formation)=>(
            <button className='btn btn-primary' onClick={()=> navigate('/paiement')}>{formation.typeFormation}</button>
          ))
            
          }
        {filiere && filiere.map((filiere)=>(
          <div key={filiere.id}>
            <h2>Objectif</h2>
            <p>{filiere.objectif}</p>

            <h2>Vacation</h2>
            <p>{filiere.vacation}</p>

            <h2>Insertion Professionnelle</h2>
            <p>{filiere.insertionProfessionnel}</p>
          </div>
        ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardEtudiant;
