
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice.js";
import { carsReducer } from "./cars/carsSlice.js";
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
import storage from "redux-persist/lib/storage"; // localStorage

// Настройка persist для auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cars: carsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);





// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./auth/authSlice.js";
// import { carsReducer } from "./cars/carsSlice.js";


// export const store = configureStore({
//     reducer: {
//       auth: authReducer,
//       cars: carsReducer
//     }
// });