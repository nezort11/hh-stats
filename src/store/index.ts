import { statusReducer } from "./status/index";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import createSagaMiddleware from "redux-saga";

import { vacancyReducer } from "./vacancy";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    vacancy: vacancyReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
