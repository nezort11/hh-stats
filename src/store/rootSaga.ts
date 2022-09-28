import { fork } from "redux-saga/effects";
import { watchVacancySagas } from "./vacancy/sagas";

export function* rootSaga() {
  yield fork(watchVacancySagas);
}
