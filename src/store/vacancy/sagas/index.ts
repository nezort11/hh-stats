import { fork } from "redux-saga/effects";
import { watchAddVacancy } from "./addVacancy";
import { watchGetVacancy } from "./getVacancy";

export function* watchVacancySagas() {
  yield fork(watchAddVacancy);
  yield fork(watchGetVacancy);
}
