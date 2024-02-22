import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SidebarEtudiant from './SidebarEtudiant';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';

const Profil = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [dateN, setDateN] = useState(null);
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const inscription = useSelector((state) => state.inscription);
    const [profile, setProfile] = useState(null);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const [filiere, setFiliere] = useState(null);
    const verification = () => {
        if (Array.isArray(inscription) && inscription.length > 0) {
            setProfile(inscription[0]);
        } else {
            setProfile(inscription);
        }
    }
    const getFiliere = async()=>{
        try{
            const response = await axios.get(`${apiURL}filiere/${inscription.FiliereId}`);
            console.log(response.data.nom);
            setFiliere(response.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        verification();
        getFiliere();
        if (profile) {
            const dateDeNaissance = new Date(profile.dateDeNaissance);
            setDateN(dateDeNaissance);
        }
    }, [user, inscription, profile]);

    return (
        <div>
            <Header />
            <SidebarEtudiant />
            <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
                <div className="container">
                
                    <div className="section-profil">
                    
                        <div className="col-md-6">
                        {profile &&(
                            <section>
                                <p>NOM : <span>{profile.nom}</span></p>
                                <p>PRENOM :<span>{profile.prenom}</span></p>
                                <p>DATE DE NAISSANCE <span>{dateN && dateN.getDate()}/{dateN && dateN.getMonth() + 1}/{dateN && dateN.getFullYear()}</span></p>
                                <p>Fonction : <span>{profile.fonction}</span></p>
                                
                            </section>
                            )}
                        </div>
                        <div className="vertical-line"></div>
                        <div className="col-md-6">
                        {profile &&(
                            <section>
                                <p>EMAIL : <span>{profile.email}</span></p>
                                <p>TELEPHONE : <span>{profile.telephone}</span></p>
                                <p>NOM DU MERE: <span>{profile.nomMere}</span></p>
                                <p>NOM DU PERE : <span>{profile.nomPere}</span></p>
                            </section>
                        )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profil;
