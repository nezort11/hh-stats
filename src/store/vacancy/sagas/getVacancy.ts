import { client } from "client";
import { GetVacancyResponse } from "client/types";
import { urls } from "client/urls";
import { ActionType } from "store/actionTypes";
import { wrap } from "store/utils";
import { call, takeEvery } from "typed-redux-saga";

import { getVacancy } from "../actions";

export function* getVacancySaga({
  payload: { query },
}: {
  payload: ReturnType<typeof getVacancy>["payload"];
}) {
  // const {
  //   data: { count },
  // }: GetVacancyResponse = yield* call(() =>
  //   client.get(urls.vacancy, { params: { query } })
  // );
}

export function* watchGetVacancy() {
  yield* takeEvery(ActionType.GetVacancy, wrap(getVacancySaga));
}
