import { AnyAction, Reducer } from "@reduxjs/toolkit";

const initialState = {};

export enum RequestStatus {
  Init = "INIT",
  Pending = "PENDING",
  Success = "SUCCESS",
  Error = "ERROR",
  Reset = "RESET",
}

export type StatusState = Record<string, RequestStatus>;

export const statusReducer: Reducer<StatusState, AnyAction> = (
  state = initialState,
  { type }
): StatusState => {
  const matches = new RegExp(
    `(.*)_(${RequestStatus.Pending}|${RequestStatus.Success}|${RequestStatus.Error}|${RequestStatus.Reset})`
  ).exec(type) as unknown as [undefined, string, RequestStatus] | undefined;

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]:
      requestState === RequestStatus.Reset ? RequestStatus.Init : requestState,
  };
};
