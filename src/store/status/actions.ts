import { RequestStatus } from ".";

export const pending = <T = string, P = never>(
  defaultActionType: T,
  payload?: P
) => ({
  type: `${defaultActionType}_${RequestStatus.Pending}`,
  payload,
});

export const success = <T = string, P = never>(
  defaultActionType: T,
  payload?: P
) => ({
  type: `${defaultActionType}_${RequestStatus.Success}`,
  payload,
});

export const fail = <T = string, E = never>(defaultActionType: T, err?: E) => ({
  type: `${defaultActionType}_${RequestStatus.Error}`,
  payload: err,
  err,
});

export const reset = <T = string>(defaultActionType: T) => ({
  type: `${defaultActionType}_${RequestStatus.Reset}`,
});
