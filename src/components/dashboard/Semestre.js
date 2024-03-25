import React,{useEffect, useState} from 'react';
import Header from './Header';
import SidebarEtudiant from './SidebarEtudiant';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Semestre = () => {
    // const inscription = useSelector((state) => state.inscription);
    // const paiement = inscription.etatInscription;
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const { semestre } = useParams();
    const modules = useSelector((state)=>state.modules);
    const [modulesTelecharges, setModulesTelecharges] = useState(0);
    const nbTelechargeable = useSelector((state)=>state.nombreTelechargement);
    const [modulesDuSemestre, setModulesDuSemestre] = useState(null);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    // console.log(modules);
    console.log(nbTelechargeable);
  // Filtrer les modules par le numéro de semestre
  useEffect(() => {
    // Filtrer les modules par le numéro de semestre et mettre à jour l'état
    
    const filteredModules = modules && modules.filter((module) => module.semestre === parseInt(semestre));
    setModulesDuSemestre(filteredModules);
    console.log(modules);
  }, [modules, semestre]);

  // Fonction pour gérer le téléchargement du fichier PDF
  const handleDownloadPDF = (pdfFilename) => {
    // Construire le chemin complet du fichier PDF
    //nbTelechargeable
    // Vérifier si l'étudiant peut télécharger un autre module
    if (modulesTelecharges < 10) {
            console.log(pdfFilename);
            const downloadURL = `${apiURL}download/${pdfFilename}`;
          
            // Utiliser fetch pour déclencher le téléchargement
            fetch(downloadURL)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erreur lors du téléchargement du fichier');
                }
                return response.blob();
              })
              .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', pdfFilename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              })
              .catch(error => {
                console.error('Erreur de téléchargement :', error.message);
                // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
              });
    // Mettre à jour le nombre de modules téléchargés par l'étudiant
    setModulesTelecharges((prev) => prev + 1);
    } else {
    alert('Vous avez atteint la limite de téléchargement de modules.');
  }
  };

    return (
        <div>
            <Header />
            <SidebarEtudiant />
            <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
            <div className='row'>
            { modulesDuSemestre && modulesDuSemestre.map((mod)=>(
            <div className=" col-md-4 module">
                <div className="card info-card revenue-card">

                    <div className="card-body">
                    <h5 className="card-title">{mod.nom}</h5>

                    <div className="d-flex align-items-center">
                        
                        <div className="ps-3">
                        <h6>Competences visé :</h6>
                        <p>{mod.competencesVise}</p>
                        <span 
                            className="text-success small pt-1 fw-bold"
                            onClick={() => handleDownloadPDF(mod.cours)}
                            style={{ cursor: 'pointer' }}
                        >
                        Telecharger le Pdf</span> 

                        </div>
                    </div>
                    </div>

                </div>
            </div>
        ))}
        </div>
            </main>
        </div>
    );
};

export default Semestre;