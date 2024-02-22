import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ListeFiliere = () => {
    const [filieres, setFilieres] = useState([]);
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
    return (
        <div>
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
                    {/* <br /> */}
                    <strong>Vacation :</strong> {filiere.vacation}
                    </Card.Text>
                    <Link to={`/formation/${filiere.id}`} className='btn btn-primary'>En savoir plus</Link>
                </Card.Body>
                </Card>
            </div>
            ))}
        </div> 
        </div>
    );
};

export default ListeFiliere;