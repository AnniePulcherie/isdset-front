import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInscription } from '../../app/inscriptionSlice';
import Footer from './footer';

const Paiement = () => {
  const user = useSelector((state) => state.user);
  const etudiant = useSelector((state) => state.inscription);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [motif, setMotif] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [bancaire, setBancaire] = useState(false);
  const [operateur, setOperateur] = useState('');
  const [nombreMois, setNombreMois] = useState(1);
  const [reference, setReference] = useState('');
  const [dateVersement, setDateVersement] = useState('');
  const [montant, setMontant] = useState(0);
  const [mois, setMois] = useState(false);
  const [reponse, setReponse] = useState(null);
  const [bordereau, setBorderau] = useState('');
  const [agence, setAgence] = useState('');
  const [etatEcolage, setEtatEcolage] = useState(false);
  const [reponseMobile, setReponseMobile] = useState(null);
  const [intensive, setIntensive] = useState(false);
  const [ecolageIntensive, setEcolageIntensive] = useState(300000);
  const [module, setModule] = useState(false);
  const totalMois = 12;
  const [nbModule, setNbModule] = useState(0);
  const [nbMoisPayer, setNbMoisPayer] = useState(0);
  const [moduleTelechargeable, setModuleTelechargeable] = useState(0);
  
  const [listeFormation,setListeFormation] = useState([]);
  const [paiement, setPaiement] = useState(null);
  const [formation, setFormation] = useState([]);

  const getInscriptionFormation = async () => {
  try {
    console.log(etudiant);
    const reponse = await axios.get(`${apiURL}inscription/formation/${etudiant.id}`);
    console.log(reponse.data);
    setListeFormation(reponse.data);
  } catch (error) {
    console.log(error);
  }
}

  const getPaiement = async()=>{
    
    try{
      
      const paiement = await axios.get(`${apiURL}paiement/etudiant/${etudiant.id}`);
      if(paiement){
        setPaiement(paiement.data);
        console.log(paiement.data[0]);
        
        console.log(formation);
        // setTotalMois(formation.moisTotal);
        setNbMoisPayer(paiement.data[0].nombreMois);
        console.log(paiement.data[0].nombreMois, formation.moisTotal, nbModule);
      }
      
    }catch(err){

      console.log(err);
    }
  }
  const methodePaiement = async () =>{
    if(mois){
      setEtatEcolage(true);
    }

    const paiementData = {
      motifs: motif.toString(),
      nombreMois,
      dateVersement,
      montantTotal: montant,
      etatEcolage,
      etatInscription: true,
      moduleTelechargeable,
      EtudiantId: etudiant.id,
      FormationId: formation.id,
    };
    console.log(user.id);
    // Envoyez les données du paiement au serveur
    
    try{
       // Si les deux motifs sont inclus, définir etatInscription à true
        paiementData.etatInscription = true;
       const newPaiement = await axios.post(`${apiURL}paiement`, paiementData);
        console.log(newPaiement);
       console.log(newPaiement);
            if(mobile){
              const reponse = await axios.post(`${apiURL}paiementMobile`, {
                operateur,
                reference,
                montant,
                PaiementId : newPaiement.id
              });
            
              console.log(reponse);
              
            }else if(bancaire){
              const reponse = await axios.post(`${apiURL}paiementBancaire`, {
                bordereau,
                agence,
                montant,
                PaiementId:newPaiement.id
              })
             
              console.log(reponse.data);
            }
            alert("Paiement bien enregistrer, Merci de patienter en attendant la verification");
            navigate('/accueil');
        
    
      }catch (erreur){
        console.log(erreur);
        alert(erreur.response.data.message);
      }
  }
  const postPaiement = async()=>{
    console.log(nbMoisPayer,totalMois);
    const mois = parseFloat((parseInt(nbMoisPayer) * 100)/ parseInt(formation.totalMois));
    console.log("mois : ", mois);
    setModuleTelechargeable(parseFloat(mois * parseInt(nbModule))/ 100);

      if(!paiement){
        const motifsNecessaires = ['DroitInscription', 'FraisGeneraux'];
        const motifsPresent = motifsNecessaires.every(m => motif.includes(m));
        if (!motifsPresent) {
          alert("Tu dois payer le droit d'inscription et le frais genereaux.");
          if(intensive && ecolageIntensive < 300000){
            alert("le montant minimum du premier versemment d'ecolage est 300000Ar");
            
          }
        }
      }
      
        console.log("methodePaiement");
        methodePaiement();
      //   try{
      //     if(mobile){
      //       if(!operateur || !reference){
      //         alert("Toutes les champs sont obligatoire");
              
      //       }else{
      //       const reponse = await axios.post(`${apiURL}paiementMobile`, {
      //         operateur,
      //         reference
      //       })
            
      //       setReponseMobile(reponse.data);
            
      //     }
      //     }else if(bancaire){
      //       if(!bordereau || !agence){
      //         alert("Toutes les champs sont obligatoire");
              
      //       }else{
      //       const reponse = await axios.post(`${apiURL}paiementBancaire`, {
      //         bordereau,
      //         agence
      //       })
      //       setReponse(reponse.data);
      //       console.log(reponse.data);
      //       methodePaiement();
      //     }
      //     }
        
      // }catch (erreur){
      //   console.log('erreur :', erreur);
     
}
  const paiementMobile = () => {
    setBancaire(false);
    setMobile(true);
  };

  const paiementBancaire = () => {
    setMobile(false);
    setBancaire(true);
  };

  const nombreMoisChange = (e) => {
    const newNombreMois = parseInt(e.target.value, 10);
    setNombreMois(newNombreMois);
  };

  const handleMotifChange = (e, forma) => {
    const { name, checked } = e.target;
    let newMotif = [...motif];
    let newMontant = montant;
    if (checked) {
      // La checkbox a été cochée
      if (name === "Ecolage") {
        if(intensive || module){
          setMois(false);
        }else{
          setMois(true);
        }
        
        //forma = parseFloat(forma) * parseFloat(nombreMois);
      }
      if( name ==="FraisGeneraux"){
        console.log(forma);
      }
      newMontant += parseFloat(forma);
      newMotif.push(name);
     // setMontant(newMontant);
    } else {
      // La checkbox a été décochée
      const index = newMotif.indexOf(name);
      if (index !== -1) {
        newMotif.splice(index, 1);
        if (name === "Ecolage") {
          setMois(false);
          
        }
        newMontant -= parseFloat(forma);
        setMontant(newMontant);
      }
    }
    setMontant(newMontant);
    setMotif(newMotif);
  };

  const appelFormation =(formation)=>{
    setFormation(formation); 
    if(formation.typeFormation === "Intensive"){
      setIntensive(true)
    }else{
      setIntensive(false);
    }
  }

 const handleEcolaIntensive =(e)=>{
    if(e.target.value <300000){
      alert("Le montant minimum est de 300000 Ar");
    }
    setEcolageIntensive(e.target.value);
 }
  useEffect(() => {
    // Calculez le montant total lorsque nombreMois change
    if(!user && !etudiant){
      navigate('/login');
    }
   
    getPaiement();
    getInscriptionFormation();
    
    const ecolage = parseFloat(formation.ecolage);
    console.log(listeFormation);
    let montantTotal = 0;
    if(intensive){
      setMois(false);
      montantTotal += parseFloat(ecolageIntensive);
    } 
    if (mois || module) {
      
        montantTotal += ecolage * parseFloat(nombreMois);
        setEtatEcolage(true);   
    }
 
    // Ajoutez le montant de chaque formation cochée
    motif.forEach((name) => {
      switch (name) {
        case 'DroitInscription':
          montantTotal += parseFloat(formation.droitInscription);
          break;
        case 'FraisGeneraux':
          montantTotal += parseFloat(formation.fraisGeneraux);
          console.log(formation.fraisGeneraux);
          break;
        case 'Ecolage':
          // Déjà géré ci-dessus
          break;
        case 'DroitExamen':
          montantTotal += parseFloat(formation.droitExamen);
          break;
        // Ajoutez d'autres cas pour d'autres motifs si nécessaire
        default:
          break;
      }
    });
    
    setMontant(montantTotal);
  }, [nombreMois, mois, motif, ecolageIntensive]);
  
  const handleOperateurChange = (e) => {
    setOperateur(e.target.value);
  };

  return (
    <div>
      <Menu />
      <main className='paiement'>
      <div className='formationApayer'>
          {listeFormation && listeFormation.map((formation)=>(
            <div key={formation.id}>
              <button className='btn btn-primary' onClick={()=>appelFormation(formation)}>{formation.typeFormation}</button>
            </div>
            ))}
      </div>
        
        <div className='row'>
          <div className='col-md-6'>
            
            <section className ='droitePaiement'>
              <h2>Mode de paiement</h2>
              <div className='row'>
                <button className='btn btn-primary' onClick={paiementMobile}>
                  Paiement via Mobile Money
                </button>
                <button className='btn ' onClick={paiementBancaire}>
                  Paiement par versement bancaire
                </button>
              </div>
            </section>
          </div>
          <div className='col-md-6'>
            <section>
              <article>
                <h2>Motifs</h2>
                <Form>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="DroitInscription"
                      label={`Droit d'inscription ${listeFormation  && formation.droitInscription} Ar`}
                      value="Droit d'inscription"
                      checked={motif.includes('DroitInscription')}
                      onChange={(e) => handleMotifChange(e, formation && formation.droitInscription)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="FraisGeneraux"
                      label={`Frais Generaux ${formation.fraisGeneraux} Ar`}
                      value='FraisGeneraux'
                      checked={motif.includes('FraisGeneraux')}
                      onChange={(e) => handleMotifChange(e, formation.fraisGeneraux)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="Ecolage"
                      label={`Ecolage ${listeFormation && formation.ecolage} Ar`}
                      value="Ecolage"
                      checked={motif.includes('Ecolage')}
                      onChange={(e) => handleMotifChange(e, formation.ecolage)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="DroitExamen"
                      label={`Droit d'examen ${listeFormation && formation.droitExamen} Ar`}
                      value="DroitExamen"
                      checked={motif.includes('DroitExamen')}
                      onChange={(e) => handleMotifChange(e, formation.droitExamen)}
                    />
                  </Form.Group>
                </Form>
              </article>
              <div>
              {mois && (
                      <Form.Group controlId="nombreMois">
                        <Form.Label>Nombre de Mois</Form.Label>
                        <Form.Control type="number"  name="nombreMois" value={nombreMois} onChange={nombreMoisChange} requierd />
                      </Form.Group>
                    )}
                    {module && (
                      <Form.Group controlId="nombreMois">
                        <Form.Label>Nombre de Module</Form.Label>
                        <Form.Control type="number"  name="nombreMois" value={nombreMois} />
                      </Form.Group>
                    )}
                    {intensive &&(
                      <Form.Group controlId="nombreMois">
                        <Form.Label>Première versement: minimum 300.000 Ar</Form.Label>
                        <Form.Control type="number" 
                        name="ecolageIntensive" 
                        value={ecolageIntensive} min= {300000} 
                        onChange={handleEcolaIntensive} requierd/>
                      </Form.Group>
                    )}
                {mobile && (
                  <Form>
                    <div className='row'>
                    <h3>Operateur</h3>
                      <Form.Group controlId="operateur">
                        <Form.Check
                          type="radio"
                          label='Telma'
                          name='choix'
                          value='Telma'
                          checked={operateur === 'Telma'}
                          onChange={handleOperateurChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="operateur">
                        <Form.Check
                          type="radio"
                          label='Orange'
                          name='choix'
                          value='Orange'
                          checked={operateur === 'Orange'}
                          onChange={handleOperateurChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="operateur">
                        <Form.Check
                          type="radio"
                          label='Airtel'
                          name='choix'
                          value='Airtel'
                          checked={operateur === 'Airtel'}
                          onChange={handleOperateurChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    
                    <Form.Group controlId="reference">
                      <Form.Label>Reference</Form.Label>
                      <Form.Control type="text" name="reference" value={reference} onChange={(e) => setReference(e.target.value)} requierd/>
                    </Form.Group>
                    <Form.Group controlId="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" name="date" value={dateVersement} onChange={(e) => setDateVersement(e.target.value)} requierd/>
                    </Form.Group>
                    <Button variant="success" onClick={postPaiement}>Enregistrer le paiement</Button>
                    <h2>Montant total: {montant} Ar</h2>
                    <p>Motif: {motif.join(', ')}</p>
                  </Form>
                )}
                {bancaire && (
                  <Form>
                    
                    <Form.Group controlId="borderau">
                      <Form.Label>Numero de Borderau</Form.Label>
                      <Form.Control type="text" name="borderau" 
                      value={bordereau} onChange={(e) => setBorderau(e.target.value)} requierd/>
                    </Form.Group>
                    <Form.Group controlId="agence">
                      <Form.Label>Nom de l'agence</Form.Label>
                      <Form.Control type="text" name="agence" 
                      value={agence} onChange={(e) => setAgence(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" name="date" value={dateVersement} onChange={(e) => setDateVersement(e.target.value)} requierd/>
                    </Form.Group>
                    <Button variant="success" onClick={postPaiement}>Ajouter le Paiement</Button>
                    <h2>Montant total: {montant} Ar</h2>
                    <p>Motif: {motif.join(', ')}</p>
                  </Form>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Paiement;
