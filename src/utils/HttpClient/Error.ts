export const UNAUTHENTICATED_ERROR = Symbol();

export const errorIs = (error: IError | any, type: symbol) => error.type && error.type === type;

export const UnauthenticatedError = (message?: string): IError => ({
  type: UNAUTHENTICATED_ERROR,
  message,
});

interface IError {
  type: symbol;
  message?: string;
}
