import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import chiamataUtentiReducer from '../slice/listaUtentiSlice';
import chiamataPostsReducer from '../slice/listaPostSlice';
import chiamataCategorieReducer from '../slice/listaCategorieSlice';
import utenteSelezionatoReducer from "../slice/utenteSelezionatoSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const rootPersistConfig = {
    key: "root",
    storage,
    transforms: [
      encryptTransform({
        secretKey: "my-super-secret-key",
        onError: function (error) {
          console.log(error);
        },
      }),
    ],
  };

  const rootReducer = combineReducers({
        chiamataUtenti: chiamataUtentiReducer,
        chiamataPosts : chiamataPostsReducer,
        chiamataCategorie : chiamataCategorieReducer,
        utenteSelezionato: utenteSelezionatoReducer,
  });

  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });  
  export const persistor = persistStore(store);



