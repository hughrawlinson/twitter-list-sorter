export interface LoadingFailure {
  _type: "LoadingFailure";
  reason: string;
}

export function isLoadingFailure(a: any): a is LoadingFailure {
  if (a && a._type && a._type === "LoadingFailure") {
    return true;
  }
  return false;
}
