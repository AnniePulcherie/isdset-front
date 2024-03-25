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
import { setListeFilieres } from '../../app/listeFiliereSlice';

const SidebarEtudiant = () => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const formationInscrit = useSelector((state)=>state.formations);
    const user = useSelector((state) => state.user);
    const etudiant = useSelector((state) => state.etudiant);
   
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
    const dispatch = useDispatch();
  
    

    const getFiliere = async () => {
      let table = [];
      try {
        const response = await axios.get(`${apiURL}etudiant/filiere/${etudiant.id}`);
        console.log('reponse', response.data.listeModule);
        dispatch(setListeFilieres(response.data.listeFilieres));
        // setNbModule(response.data.filiere[0].nbModule);
       
        // setModules(response.data.listeModule);
        for(let m of response.data.listeModule){
            console.log(m);
            for(let i of m){
              const tableau = table.push(i);
            console.log("tableau",tableau);
            }
           

        }
        console.log("table " ,table);
        setModules(table);
        dispatch(setModuleSemestre(table));
        setNbModule(table.length);
  
      } catch (error) {
        console.error('Erreur lors de la récupération de la filière :', error);
      }
    };


    console.log("semestre: ", semestres);

   
    
    const getPaiement = async ()=>{
      try{
      for ( const formation of formationInscrit){
        const reponse = await axios.get(`${apiURL}paiement/nombreMois/${etudiant.id}/${formation.id}`);
        console.log(reponse.data);
       setNbMois(reponse.data.totalMois);
     
      }}catch(error){
        console.log(error);
      }
     
    }

   
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
   
          getFiliere();
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
         
          // s'assure que le nombreModulesTelechargeables est toujours positif
          
          dispatch(setNombreTelechargement(Math.max(nombreModulesTelechargeables)));

        
    },[user,nbMois, etudiant]);

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
