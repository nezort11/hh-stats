import { call, put } from "typed-redux-saga";
import { pending, success, fail } from "./status/actions";

export type Args = any[];
export type Fn = (...args: Args) => any;

export const wrap = (fn: Fn, onError?: (error: any) => void) =>
  function* (...args: Args) {
    yield* put(pending(args?.[0]?.type));
    try {
      yield* call(fn, ...args);
      yield* put(success(args?.[0]?.type));
    } catch (error) {
      console.error(error);
      yield* put(fail(args?.[0]?.type));
      onError?.(error);
    }
  };
