import { createAction } from "@reduxjs/toolkit";
import { VacancyActionType } from "./actionTypes";

export const getVacancy = createAction(VacancyActionType.GetVacancy);
