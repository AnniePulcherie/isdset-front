import React from 'react';
import  { useState } from 'react';
import axios from 'axios';
const formation = () => {
   
  const [userData, setUserData] = useState({
    nom: '',
    image: '',
    description: '',
    inscription: '',
    finInscription:'',
    debutFormation: '',
    finFormation:''
  });

  const handleChange = (e) => {
    const { nom, image, description, inscription,finInscription,debutFormation,finFormation } = e.target;

    // Gérer les champs de fichier séparément
    if (type === 'file') {
      setUserData({
        ...userData,
        [nom]: files[0],
      });
    } else {
      setUserData({
        ...userData,
        [nom]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      const response = await axios.post('/votre-endpoint-node-js', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Données envoyées avec succès', response.data);
      // Réinitialisez l'état du formulaire ici
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données', error);
    }
  };

  return (
    <div>
     
      <section className="section">
        <div className='formulaire'>
          <div className="col-lg-6">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">S'inscrire à une formation</h5>

                <form>
                  <div className="row mb-3">
                    <label for="inputText" className="col-sm-2 col-form-label">Nom</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={userData.nom} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label for="inputEmail" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={userData.description} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <label for="inputNumber" className="col-sm-2 col-form-label">inscription</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={userData.inscription} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label for="inputNumber" className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                      <input className="form-control" type="file" id="formFile" value={userData.image} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputDate" className="col-sm-2 col-form-label">Date d'inscription</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={userData.inscription} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputDate" className="col-sm-2 col-form-label">Fin d'inscription</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={userData.finInscription} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputDate" className="col-sm-2 col-form-label">Date de naissance</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={userData.debutFormation} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputDate" className="col-sm-2 col-form-label">Fin de formation</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={userData.finFormation} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Select</label>
                    <div className="col-sm-10">
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Choisir une formation</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>


                  <div >
                    
                    
                      <button type="submit" className="btn btn-primary mybtn" onClick={handleSubmit}>S'inscrire</button>
                    
                  </div>

                </form>

              </div>
            </div>

          </div>


        </div>
      </section>

        </div>
    );
};

export default formation;