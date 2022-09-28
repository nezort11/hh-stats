import { ActionType } from "./../../actionTypes";
import { wrap } from "store/utils";
import { all, call, select, takeLatest, put } from "typed-redux-saga";

import { getVacancies } from "../actions";
import { vacancySelector } from "../selectors";
import { urls } from "client/urls";
import { client } from "client";
import { updateVacancyState } from "..";
import { GetVacancyResponse } from "client/types";

export function* getVacanciesSaga({
  payload,
}: {
  payload: ReturnType<typeof getVacancies>["payload"];
}) {
  const { vacancies = [] } = yield* select(vacancySelector);

  const datas: GetVacancyResponse[] = yield* all(
    vacancies.map(({ query }) =>
      call(() => client.get(urls.vacancy, { params: { query } }))
    )
  );

  yield* put(
    updateVacancyState({
      vacancies: datas.map(({ data: { count } }, index) => ({
        query: vacancies[index].query,
        count,
      })),
    })
  );
}

export function* watchGetVacancies() {
  yield* takeLatest(ActionType.GetVacancies, wrap(getVacanciesSaga));
}
