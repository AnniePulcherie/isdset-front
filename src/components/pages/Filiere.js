import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import { Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';
import { useSelector } from 'react-redux';


const Filiere = () => {
  const apiURL = process.env.REACT_APP_API_USER_URL;
  // const user = useSelector((state) => state.user);
  const [filieres, setFilieres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // État du filtre
  // const etudiante = useSelector((state) => state.inscription);
  // const [formation, setFormation] = useState([]);
  // const navigate = useNavigate();
  // const [imageUrls, setImageUrls] = useState([]);
  // let imageUrlsObject = [];
  // const choixFiliere = async (filiereId) => {
  //   console.log("etudiant", etudiante.id);
  //   console.log('filiere', filiereId);
    
  //   const formData = new FormData();
  //   formData.append("EtudiantId", etudiante.id);
  //   formData.append("FiliereId", filiereId);
    
  //   if (formation.length > 0) {
  //     try {
  //       const response = await axios.post(`${apiURL}etudiantFiliere/`, formData, {
  //         headers: { "Content-Type": 'application/json' }
  //       });
  //       console.log(response.data);
  //       alert(response.data.message);
  //     } catch (error) {
  //       console.error('Erreur lors de l\'inscription :', error);
  //     }
  //   } else {
  //     navigate('/formation');
  //   }
  // };

  // const getFormation = async () => {
  //   try {
  //     const response = await axios.get(`${apiURL}inscription/formation/${etudiante.id}`);
  //     setFormation(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération de la formation :', error);
  //   }
  // };
  const fetchFilieres= async()=>{
    try {
      const response = await axios.get(`${apiURL}filiere`);
      setFilieres(response.data);
      console.log(response.data);
      // uploadImages(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des filières :', error);
    }
  }

  useEffect(() => {
    // getFormation();
    
    fetchFilieres();
    // console.log(imageUrls);
  }, []);

  // const uploadImages = async (sary) => {
  //   console.log(sary);
  //   try {
      
  //       const image = await axios.get(`${apiURL}uploads/${sary}`);
  //       console.log(image.data);
  //       return image.data;
      
  //     //imageUrlsObject.push(imageUrlsPromise.data);
  //     //  console.log(imageUrlsPromise);
  //     //  imageUrlsObject = Object.assign({}, ...imageUrlsPromise);
  //     // console.log(imageUrlsObject);
  //     //setImageUrls(imageUrlsObject);
  //   } catch (error) {
  //     console.error('Erreur lors du chargement des images :', error);
  //   }
  // };

  const filteredFilieres = filieres.filter((filiere) => {
    if (filter && filiere.filter !== filter) {
      return false;
    }
    if (
      filiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.objectif.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.insertionProfessionnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.vacation.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <Menu />
      <main>
        <div className="container">
          <h1>Liste des Filières</h1>
          <section className='search'>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Rechercher une filière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">Filtrer par</option>
                <option value="objectif">Objectif</option>
                <option value="insertionProfessionnel">Insertion Professionnelle</option>
                <option value="vacation">Vacation</option>
              </Form.Control>
            </Form.Group>
          </section>
          <div className="row">
            {filteredFilieres && filteredFilieres.map((matiere) => (
              <div className="col-md-4" key={matiere.id}>
                <Card style={{ width: '18rem', margin: '10px', height: '30rem'}}>
                  <img src={`${apiURL}uploads/${matiere.image}`} alt={`sary `} />
                    
                  <Card.Body>
                    <Card.Title>{matiere.nom}</Card.Title>
                    <Card.Text>
                      <strong>Vacation :</strong> {matiere.vacation}
                    </Card.Text>
                    <div className='boutonFiliere'>
                      <Link to={`/formation/${matiere.id}`} className='btn btn-primary'>En savoir plus</Link>
                      {/* <button onClick={() => choixFiliere(matiere.id)} className='btn btn-primary' variant="primary">S'inscrire</button> */}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Filiere;
