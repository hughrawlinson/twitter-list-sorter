import React, {
  ComponentType,
  createContext,
  useContext,
  useState,
} from "react";

interface ShortProfileToggleContext {
  showShortProfile: boolean;
  toggleShortProfile: () => void;
}

export const ShortProfileToggleContext =
  createContext<ShortProfileToggleContext>({
    showShortProfile: false,
    toggleShortProfile: () => {},
  });

export const ShortProfileToggleProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showShortProfile, setShowShortProfile] = useState(false);

  return (
    <ShortProfileToggleContext.Provider
      value={{
        showShortProfile,
        toggleShortProfile: () => {
          setShowShortProfile(!showShortProfile);
        },
      }}
    >
      {children}
    </ShortProfileToggleContext.Provider>
  );
};

export const useShortProfileToggle = () => {
  const context = useContext(ShortProfileToggleContext);
  return context;
};

export const withShortProfileToggle = (
  Component: (...args: any[]) => JSX.Element
) => {
  return (props: any) => (
    <ShortProfileToggleProvider>
      <Component {...props} />
    </ShortProfileToggleProvider>
  );
};
