import { Middleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const sagaMiddleware = createSagaMiddleware();

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV != "production" && logger, sagaMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
