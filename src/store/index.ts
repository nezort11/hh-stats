import { statusReducer } from "./status/index";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { vacancyReducer } from "./vacancy";
import { watchSagas } from "./watchSagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    vacancy: vacancyReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchSagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
