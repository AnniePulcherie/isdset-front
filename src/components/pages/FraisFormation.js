import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FraisFormation = ({ id }) => {
    const [frais, setFrais] = useState([]);
    
    useEffect(() => {
        const getFormation = async (id) => {
            try {
                const reponse = await axios.get(`http://localhost:3001/formation/${id}`);
                setFrais(reponse.data);
            } catch (erreur) {
                console.log(erreur);
            }
        }

        // Assurez-vous que id est une valeur non nulle avant d'appeler getFormation
        if (id) {
            getFormation(id);
        }
    }, [id]);

    return (
        <div>
            {frais && (
                <table className="table">
                    <thead>
                        <tr>
                        
                        <th>Frais Généraux</th>
                        <th>Droit d'inscription</th>
                        <th>Droit d'examen</th>
                        <th>Ecolage</th>
                        <th>Paiement d'ecolage</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                            
                            <td>{frais.fraisGeneraux} Ar</td>
                            <td>{frais.droitInscription} Ar</td>
                            <td>{frais.droitExamen} Ar</td>
                            <td>{frais.ecolage} Ar</td>
                            <td>{frais.tranche}</td>
                            
                        </tr>
                       
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FraisFormation;
