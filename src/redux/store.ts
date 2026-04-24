import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const storage = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string): Promise<void> => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key: string): Promise<void> => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

// reducer'ları persist için birleştirelim
const rootReducer = combineReducers({
  notes: noteReducer,
});

// persist için ayar nesnesi
const persistConfig = {
  key: "root", // local storage'da kaydedilecek anahtar
  storage,
  whitelist: ["notes"],
};

// persist reducer'ı oluştur
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store'u oluştur
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

// persist store'u oluştur
export const persistor = persistStore(store);

// rootState tipi tanımla (store'un tipi > useSelector'de kullanıyoruz)
export type RootState = ReturnType<typeof store.getState>;

// appDispatch tipi tanımla (useDispatch'de kullanıyoruz)
export type AppDispatch = typeof store.dispatch;
