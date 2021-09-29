import { withShortProfileToggle } from "@src/features/ShortProfileButton";
import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withShortProfileToggle(MyApp);
