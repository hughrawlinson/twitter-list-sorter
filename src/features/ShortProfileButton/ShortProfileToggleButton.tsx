import { useShortProfileToggle } from "./shortProfileToggleContext";

export const ShortProfileToggleButton = () => {
  const { showShortProfile, toggleShortProfile } = useShortProfileToggle();
  return (
    <button onClick={toggleShortProfile}>
      {showShortProfile ? "Show long profiles" : "Show short profiles"}
    </button>
  );
};
