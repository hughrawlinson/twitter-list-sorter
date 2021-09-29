import createPersistedState from "use-persisted-state";

const useTwitterTokenState = createPersistedState("TwitterToken");

export const useTwitterToken = (): string | null => {
  const [token, setToken] = useTwitterTokenState<string | null>(null);

  if (typeof window === "undefined") {
    // we're on the nextjs server, no twitter auth for us!
    return null;
  }

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("token")) {
    setTimeout(() => setToken(searchParams.get("token")), 0);
  }
  return token;
};
