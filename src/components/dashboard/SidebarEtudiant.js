import axios from 'axios';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import profile from "../../assets/img/profile-img.jpg";
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { clearModules, setModuleSemestre } from '../../app/modulesReducer';
import { clearUser } from '../../app/userSlice';
import { clearInscription } from '../../app/inscriptionSlice';
import '../../assets/css/sidebar.css';
import { setNombreTelechargement } from '../../app/telechargement';

const SidebarEtudiant = () => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const [formationInscrit, setFormationInscrit] = useState(null);
    const user = useSelector((state) => state.user);
    const etudiant = useSelector((state) => state.inscription);
    // const modules = useSelector((state)=>state.modules);
    const [nbModules, setNbModule] = useState(0);
    const [nbMois, setNbMois] = useState(0);
    const totalMois = 12;
    const [moduleTelechargeable, setModuleTelechargeable] = useState(0);
    const [modul, setModul] = useState(0);
    const navigate = useNavigate();
    const [etatModule, setEtatModule] = useState(false);
    const [modules, setModules ] = useState([]);
    const semestres = [...new Set(modules.map((module) => module.semestre))];
    

    const getFiliere = async () => {
    
      try {
        
        const response = await axios.get(`${apiURL}etudiant/filiere/${etudiant.id}`);
        console.log(response.data.module);
        console.log('reponse', response.data.filiere);
        setNbModule(response.data.filiere[0].nbModule);
        dispatch(setModuleSemestre(response.data.module));
        setModules(response.data.module);
        
  
      } catch (error) {
        console.error('Erreur lors de la récupération de la filière :', error);
      }
    };


    console.log("semestre: ", semestres);
    const dispatch = useDispatch();
   
    // const getInscriptioFormation = async ()=>{
      
    //   try{
    //     const reponse = await axios.get(`${apiURL}inscription/formation/${etudiant.id}`);
    //     console.log(reponse.data);
        
    //     setFormationInscrit(reponse.data);
    //   }catch(error){
    //     console.log(error);
    //   }
     
    // }
    
    const getPaiement = async ()=>{
      //condition();
      try{
        const reponse = await axios.get(`${apiURL}paiement/etudiant/${etudiant.id}`);
        console.log(reponse.data);
        setNbMois(reponse.data[0].nombreMois);
        // console.log(reponse.data.nombreTelechargeable);
        // setModul(reponse.data.nombreTelechargeable);
      }catch(error){
        console.log(error);
      }
     
    }

    // const getFormation = async ()=>{
    //   //condition();
    //   try{
        
    //     const reponse = await axios.get(`${apiURL}formation/${inscription[0].FormationId}`);
    //     console.log(reponse.data.moisTotal);
    //     setTotalMois(reponse.data.moisTotal);
    //   }catch(error){
    //     console.log(error);
    //   }
     
    // }

    // const getModule = async () => {
    //     //condition();
    //     console.log(inscription);
    //     if(inscription && inscription.FormationId !== 3){
    //       setEtatModule(true);
          
    //     }
    //     try {
    //       const response = await axios.get(`${apiURL}module/filiere/${inscription[0].FiliereId}`); // Remplacez par l'URL de votre API
    //       setModules(response.data.modules);
    //       console.log(response.data.modules);
    //       setNbModule(response.data.nombreTotalModules);
    //       console.log(response.data.nombreTotalModules);  
          
              
    //     } catch (error) {
    //       console.error('Erreur lors de la récupération des modules :', error);
    //     }
    //   };
      
      const handleLogout = () => {
        dispatch(clearUser());
        dispatch(clearInscription());
        dispatch(clearModules());
        navigate('/login'); // Utilisez la fonction navigate pour la redirection
      };
    useEffect(()=>{
     
          if(!user){
              navigate('/login');
          }
          else if(!etudiant){
            
              navigate('/accueil');
          }
          // else if(inscription.etatInscription === false){
          //   alert("veullez payer votre inscription d'abbord");
          // }
          getFiliere();
          // getInscriptioFormation();
         
          getPaiement();
         
          console.log(moduleTelechargeable);
          console.log(etatModule);
          console.log(nbMois, totalMois, nbModules);
          const mois = parseFloat((parseInt(nbMois) * 100)/ parseInt(totalMois));
          console.log("mois : ", mois);
          setModul(parseFloat((mois * parseInt(nbModules))/ 100));
          const nombreModulesTelechargeables = Math.floor((nbModules * nbMois)/totalMois);
          console.log(nombreModulesTelechargeables);
          setModul(Math.max(nombreModulesTelechargeables));
         
          // Assurez-vous que nombreModulesTelechargeables est toujours positif
          // setModuleTelechargeable(modul);
          dispatch(setNombreTelechargement(Math.max(nombreModulesTelechargeables)));

     
    },[user,nbMois,nbModules, etudiant]);

    return (
        <div>
            {!user ? (<Navigate to='/accueil' />) : (
            <aside  id="sidebar" className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                
                <div className='sary'>
                <img src={profile} alt="sary" />
                <h3>{user.nom}</h3>
                </div>
                <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item ">
                    <Link to={`/${user.role}/${user.id}/dashboard`} className= "nav-link collapsed">
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <NavLink to={`/${user.role}/${user.id}/profile`}className= "nav-link collapsed">
                    <FontAwesomeIcon icon={faUser} />
                    <span className='span'>Profile</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={`/${user.role}/${user.id}/paiementFormation`} className= "nav-link collapsed">
                    <FontAwesomeIcon icon={faUser} />
                    <span className='span'>Paiement Formation</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={`/paiement`} className= "nav-link collapsed">
                    <FontAwesomeIcon icon={faUser} />
                    <span className='span'>Payer la Formation</span>
                    </NavLink>
                </li>
                <div>
                 <h4> Mes cours </h4>
                    <ul>
                    {semestres && semestres.map((semestre) => (
                       <NavLink to={`/${user.role}/${user.id}/semestre/${semestre}`} className="nav-item nav-link collapsed"> <li key={semestre}>Semestre {semestre}</li></NavLink>
                    ))}
                    </ul>
                </div>
                
                </ul>
                <ul>
                <li className="nav-item nav-link collapsed" onClick={handleLogout}>
                         
                         <FontAwesomeIcon icon={faSignOut} />
                         <span
                         style={{ cursor: 'pointer' }}>LogOut</span>
                     
                 </li>
                </ul>
            </aside>
            )}
        </div>
    );

};

export default SidebarEtudiant;
