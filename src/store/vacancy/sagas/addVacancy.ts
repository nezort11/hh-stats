import { client } from "client";
import { GetVacancyResponse } from "client/types";
import { urls } from "client/urls";
import { ActionType } from "store/actionTypes";
import { wrap } from "store/utils";
import { call, put, takeLatest } from "typed-redux-saga";
import { pushVacanciesState } from "..";
import { addVacancy } from "../actions";

export function* addVacancySaga({
  payload: { query },
}: {
  payload: ReturnType<typeof addVacancy>["payload"];
}) {
  const {
    data: { count },
  }: GetVacancyResponse = yield* call(() =>
    client.get(urls.vacancy, { params: { query } })
  );

  yield* put(pushVacanciesState({ query, count }));
}

export function* watchAddVacancy() {
  yield* takeLatest(ActionType.AddVacancy, wrap(addVacancySaga));
}
