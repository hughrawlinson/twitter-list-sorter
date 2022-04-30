import useLocalStorageState from "use-local-storage-state";

export const useTwitterToken = (): string | null => {
  const [token, setToken] = useLocalStorageState<string | null>(
    "TwitterToken",
    { ssr: false, defaultValue: null }
  );

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
