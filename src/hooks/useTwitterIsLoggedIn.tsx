import { useTwitterToken } from "./useTwitterToken";

export function useTwitterIsLoggedIn() {
  const twitterToken = useTwitterToken();

  if (twitterToken) {
    return true;
  }
  return false;
}
