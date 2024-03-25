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
import Aos from 'aos';
import { setEtudiant } from '../../app/etudiantSlice';
const Accueil = () => {
   
    const [recherche,setRecherche] = useState("");
    const user = useSelector((state)=>state.user);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const dispatch = useDispatch();
    const etudiant= useSelector((state)=>state.etudiant);
    
    // const getEtudiant = async()=>{
        
    //     try{
    //       const reponse = await axios.get(`${apiURL}etudiant/user/${user.id}`);
    //       setEtudiante(reponse.data.etudiant);
    //       console.log(reponse.data.etudiant);
    //     //   dispatch(setEtudiant(etudiante));
    //     }catch(err){
    //       console.log(err);
    //     }
    // }
    
    const getVerification = async ()=>{
        try{
          const verification = await axios.get(`${apiURL}verification/${etudiant.id}`);
          console.log(verification.data);
  
          }catch(error){
            console.log(error);
          }
      }

      useEffect(()=>{
        // getEtudiant();
        Aos.init({duration: 2000});
        getVerification();
      },[]);
    return (
        <div className='myAccueil'>
        <Menu />
        <main>
        
            
                <section className='sectionTitre'>
                    <article className='articleTitre'>
                        <h1>Institut Superieur de Developpement</h1>
                        <h3>Sciences, Education et Technologie</h3>
                    </article>
                    <div className= 'slogan'>
                        <p>Construisons votre avenir et changer le monde </p>
                        <p>en apprenant à votre rythme</p>
                    </div>
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
                            <li>EN SALLE</li>
                        </ul>
                    </div>
                </section>
                <div className="filiere-Accueil"></div>
                <section>
                <h1>Nos Filières</h1>
                <div data-aos = "fade-left"><ListeFiliere /></div>
                
                </section>
        </main>
        <footer>
            <Footer />
        </footer>
        
        </div>
    );
};

export default Accueil;