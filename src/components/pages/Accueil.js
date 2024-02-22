import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListeFiliere from './ListeFiliere';
import sary1 from '../../assets/img/sary1.jpg';
import Menu from './Menu';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setEtudiant } from '../../app/etudiantSlice';
const Accueil = () => {
   
    const [recherche,setRecherche] = useState("");
    const user = useSelector((state)=>state.user);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const dispatch = useDispatch();
    const [etudiante, setEtudiante] = useState(null);
    
    const getEtudiant = async()=>{
        
        try{
          const reponse = await axios.get(`${apiURL}etudiant/user/${user.id}`);
          setEtudiante(reponse.data.etudiant);
          console.log(reponse.data.etudiant);
        //   dispatch(setEtudiant(etudiante));
        }catch(err){
          console.log(err);
        }
      }
    

      useEffect(()=>{
        getEtudiant();
      },[]);
    return (
        <div className='myAccueil'>
        <Menu />
        <main>
        
            
                <section className='sectionTitre'>
                    <article className='articleTitre'>
                        <h1>INSTITUT SUPERIEUR DE DEVELOPPEMENT</h1>
                        <h3>SCIENCES, EDUCATION et TECHNOLOGIE</h3>
                    </article>
                    <p className='slogan'>Construisons votre avenir et changer le monde</p>
                    <p>Apprener à votre rythme</p>
                    <img className='autre-logo' src={sary1} alt='logo' />
                </section>
                
                <section className='section2'>
                    <div className='rechercher'>
                        <div className='lesInput'>
                            <input type="text" className='inputRecherche' value={recherche} onChange = {(e)=>setRecherche(e.target.value)} placeholeder="Rechercher ..."/>
                            <button type="submit" className='btnChercher'>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>   
                            
                        </div>
                        <button className='mybtn'>
                        <Link to ='/formation' >Explorer nos formations  
                            <FontAwesomeIcon icon={faArrowRight} className="fleche"/>
                        </Link>
                        </button>

                    </div>
                    <div className='mySearch'>
                        <ul className='format'>
                            <li>A DISTANCE</li>
                            <li>EN LIGNE</li>
                            <li>EN SALLE</li>
                        </ul>
                    </div>
                </section>
                <section>
                <h1>Actualités</h1>
                <ListeFiliere />
                </section>
        </main>
        <Footer />
        </div>
    );
};

export default Accueil;