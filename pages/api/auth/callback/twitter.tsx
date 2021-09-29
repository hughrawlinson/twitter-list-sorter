import { NextApiHandler } from "next";
import { getAccessToken } from "../../../../src/twitter-calls/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (typeof JWT_SECRET === "undefined") {
  throw new Error("You must provide a JWT_SECRET as an env var");
}

const handleTwitterCallback: NextApiHandler = async (request, response) => {
  const { oauth_token: oauthToken, oauth_verifier: oauthVerifier } =
    request.query;
  if (Array.isArray(oauthToken) || Array.isArray(oauthVerifier)) {
    throw new Error(
      "You must provide no more than one of each of oauthTOken and oauthVerifier"
    );
  }
  const twitterAccessToken = await getAccessToken({
    oauthToken,
    oauthVerifier,
  });

  const auth_token = jwt.sign(
    {
      data: {
        twitterAccessToken,
      },
    },
    JWT_SECRET
  );
  response.redirect(`/logged-in?token=${auth_token}`);
};

export default handleTwitterCallback;
