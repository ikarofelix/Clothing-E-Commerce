import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV != "production" && logger, sagaMiddleware].filter(
  Boolean
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
