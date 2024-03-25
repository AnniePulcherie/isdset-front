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
import { Container, Nav, Navbar } from 'react-bootstrap';
import myLogo from '../../assets/img/myLogo.png';


const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [verification, setVerification] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const listeMenu =[
    {
      id:1,
      lien :'/accueil',
      nom :'Accueil'
    },
    {
      id:2,
      lien :'/formation',
      nom :'Formation'
    },
    {
      id:3,
      lien :'/inscription',
      nom :'inscription'
    },
    {
      id:4,
      lien :'/filiere',
      nom :'filiere'
    },
    {
      id:5,
      lien :'/contact',
      nom :'contact'
    },
    {
      id:6,
      lien :'/apropos',
      nom :'A propos'
    },
    
  ]
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
    
      <Navbar className=" fixed-top navbar menu header" expand="lg">
        <Container>
          <Navbar.Brand className="brand">
          
            <img src={myLogo} alt="logo" className="logoISDset" /> 
          
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='ms-auto menu-menu'>
              { listeMenu.map((liste)=>(
                  <NavLink to={liste.lien} className="nav-link liste-items menu-txt" key={liste.id} smooth >
                    {liste.nom}
                  </NavLink>
              ))}
              {user ? (
                <div className="right">
                  <button className="menu-txt btn btn-sm">
                    <NavLink to={`/${user.role}/${user.id}`}>
                      <FontAwesomeIcon icon={faUser} /> {user.nom}
                    </NavLink>
                  </button>
                  <button className="menu-log btn btn-sm menu-logout" onClick={handleLogout}>
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
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    
  );
};

export default Menu;
