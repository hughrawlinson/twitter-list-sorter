import Router from "next/router";
import { useTwitterToken } from "../../src/hooks";
import { useEffect } from "react";

export default function LoggedIn() {
  const twitterToken = useTwitterToken();
  useEffect(() => {
    Router.push("/");
  }, [twitterToken]);

  return <></>;
}
