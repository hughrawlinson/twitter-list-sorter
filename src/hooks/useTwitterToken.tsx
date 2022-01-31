import createPersistedState from "use-persisted-state";

const useTwitterTokenState = createPersistedState<string | null>(
  "TwitterToken"
);

export const useTwitterToken = (): string | null => {
  const [token, setToken] = useTwitterTokenState(null);

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
