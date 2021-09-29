import { NextApiHandler } from "next";
import { getRedirectAuthURI } from "../../../../src/twitter-calls/client";

const handlerTwitterRedirect: NextApiHandler = async (request, response) => {
  const redirectUri = await getRedirectAuthURI();
  response.redirect(redirectUri);
};

export default handlerTwitterRedirect;
