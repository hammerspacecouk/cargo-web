export const UNAUTHENTICATED_ERROR = Symbol();

export const errorIs = (error: IError | any, type: Symbol) => {
  return (error.type && error.type === type);
};

export const UnauthenticatedError = (message?: string): IError => ({
  type: UNAUTHENTICATED_ERROR,
  message
});

interface IError {
  type: Symbol;
  message?: string;
}
