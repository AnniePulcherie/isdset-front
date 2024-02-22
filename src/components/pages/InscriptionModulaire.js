import React, { useState } from 'react';
import GetAllModules from './getAllModule';

const InscriptionModulaire = () => {
    const [selectedModules, setSelectedModules] = useState([]);
    const handleModuleSelect = (modules) => {
        setSelectedModules(modules);
      };
    return (
        <div>
            <p>Choisir filiere d'abord, puis choisir les module et on le stock dans le colonne moduleSelectionner dans
            l'Etudiant filiere; pour la recuperer si moduleSelectionner!== null, on appel uniquement ces mondule</p>
            <GetAllModules onModulesSelect ={handleModuleSelect}/>
            {selectedModules && (
                <p> {selectedModules}</p>)}
        </div>
    );
};

export default InscriptionModulaire;