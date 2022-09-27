import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface VacancyState {
  queries: string[];
}

const initialState: VacancyState = {
  queries: [],
};

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
  },
});

export const { updateVacancyState } = vacancySlice.actions;

export const vacancyReducer = vacancySlice.reducer;
