import { compose, configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV != "production" && logger, thunk].filter(Boolean);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
