import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/menu.css';
import {
  faSignInAlt,
  faSignOut,
  faUser,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import { clearUser } from '../../app/userSlice';
import myLogo from '../../assets/img/myLogo.png';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [verification, setVerification] = useState(false);
  // Fonction pour vérifier l'inscription
  
  
  // Fonction pour vérifier l'inscription
  // const checkInscription = () => {
  //   if (inscription.length === 0) {
  //     return false;
  //   } else if (inscription.length > 1) {
  //     return inscription.some((item) => item.etatInscription === false);
  //   } else {
  //     return inscription.length === 1 && inscription[0].etatInscription === false;
  //   }
  // };

  // useEffect(() => {
  //   if (inscription.length === 0) {
  //     setVerification(false); // L'inscription est vide, pas besoin de vérifier
  //   } else {
  //     const isAnyInscriptionUnpaid = checkInscription();
  //     setVerification(isAnyInscriptionUnpaid);
  //   }
  // }, [inscription]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login'); // Utilisez la fonction navigate pour la redirection
  };

  // Fonction pour gérer la redirection vers la page de paiement
  const handlePayment = () => {
    // Vérifier si l'utilisateur est inscrit
    navigate('/paiement');
  };

  return (
    <div className="menu header fixed-top d-flex align-items-center">
      <div className="logos">
        <img src={myLogo} alt="logo" className="logoISDset" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="liens container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul>
              <li className="menu-txt nav-item">
                <NavLink to={'/accueil'}>Accueil</NavLink>
              </li>
              <li className="menu-txt">
                <NavLink to="/formation">Formation</NavLink>
              </li>
              <li className="menu-txt">
                <NavLink to="/filiere">Filiere</NavLink>
              </li>
              <li className="menu-txt">
                <NavLink to="/inscription">Inscription</NavLink>
              </li>
              <li className="menu-txt">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="menu-txt">
                <NavLink to="/apropos">A propos</NavLink>
              </li>
            </ul>
            {verification && ( 
              <button className="btn btn-primary" onClick={handlePayment}>
                Payer l'inscription
              </button>
             )} 
            {user ? (
              <div className="right">
                <button className="menu-txt">
                  <NavLink to={`/${user.role}/${user.id}`}>
                    <FontAwesomeIcon icon={faUser} /> {user.nom}
                  </NavLink>
                </button>
                <button className="menu-log menu-logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOut} />
                </button>
              </div>
            ) : (
              <div className="navbar-nav ">
                <NavLink to="/login" className="login">
                  <FontAwesomeIcon icon={faSignInAlt} /> Log in
                </NavLink>
                <NavLink to="/logup" className="login">
                  <FontAwesomeIcon icon={faUserAlt} /> Log up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
