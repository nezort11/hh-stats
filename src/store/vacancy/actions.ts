import { createAction } from "@reduxjs/toolkit";
import { VacancyActionType } from "./actionTypes";

interface GetVacancyPayload {
  query: string;
}

export const addVacancy = createAction<GetVacancyPayload>(
  VacancyActionType.AddVacancy
);

export const getVacancy = createAction<GetVacancyPayload>(
  VacancyActionType.GetVacancy
);
