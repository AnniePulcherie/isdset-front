// store.js

import { configureStore } from '@reduxjs/toolkit';
import etudiantSlice from './etudiantSlice';
import inscriptionReducer from './inscriptionSlice';
import modulesReducer from './modulesReducer';
import sidebarReducer from './sidebarSlice';
import telechargementSlice from './telechargement';
import userReducer from './userSlice'; // Importez le "slice" que vous avez créé

const store = configureStore({
  reducer: {
    user: userReducer, // Ajoutez le "slice" au store sous le nom "user"
    etudiant: etudiantSlice,
    sidebar: sidebarReducer,
    inscription : inscriptionReducer,
    modules: modulesReducer,
    nombreTelechargement: telechargementSlice,
  },
});

export default store;
