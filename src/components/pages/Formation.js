import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './footer';
import ChoisirFormation from './ChoisirFormation';

const Formation = () => {

  const [filieres, setFilieres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // État du filtre

  useEffect(() => {
    // Chargez la liste des filières depuis l'API (par exemple, une API REST)
    async function fetchFilieres() {
      try {
        const response = await axios.get('http://localhost:3001/filiere');
        setFilieres(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des filières :', error);
      }
    }

    fetchFilieres();
  }, []);

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
          {/* <div className="container">
          <h1>Liste des Filières</h1>
          <section className='serch'>
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
              {filieres && filieres.map((filiere) => (
              <div className="col-md-4" key={filiere.id}>
                  <Card style={{ width: '18rem', margin: '10px', height: '20rem'}}>
                  {filiere.image && (
                      <Card.Img variant="top" src={filiere.image} alt={filiere.nom} />
                  )}
                  <Card.Body>
                      <Card.Title>{filiere.nom}</Card.Title>
                      <Card.Text>
                      {/* <strong>Objectif :</strong> {filiere.objectif}
                      <br />
                      <strong>Insertion Professionnelle :</strong> {filiere.insertionProfessionnel} */}
                      {/* <br /> 
                      <strong>Vacation :</strong> {filiere.vacation}
                      </Card.Text>
                      <Link to={`/formation/${filiere.id}`} variant="primary">En savoir plus</Link>
                  </Card.Body>
                  </Card>
              </div>
              ))}
          </div>
          </div> */}
          <ChoisirFormation />
        </main>
        <Footer/>
    </div>
  );
};


export default Formation;