import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface Vacancy {
  query: string;
  count?: number;
}

export interface VacancyState {
  vacancies?: Vacancy[];
}

const initialState: VacancyState = {};

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    updateVacancyState: (
      state: VacancyState,
      action: PayloadAction<Partial<VacancyState>>
    ) => ({
      ...state,
      ...action.payload,
    }),
    pushVacanciesState: (
      state: VacancyState,
      action: PayloadAction<Vacancy>
    ) => ({
      ...state,
      vacancies: [...(state.vacancies ?? []), action.payload],
    }),
  },
});

export const { updateVacancyState, pushVacanciesState } = vacancySlice.actions;

export const vacancyReducer = persistReducer(
  {
    key: "vacancy",
    storage,
    whitelist: ["vacancies"],
  },
  vacancySlice.reducer
);
