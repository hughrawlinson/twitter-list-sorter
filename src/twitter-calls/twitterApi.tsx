import { NextApiResponse } from "next";
import { getLists } from "./client";
import { TwitterTokenResponse } from "./twitterTokenFromRequest";

export interface TwitterApiHandler {
  provider: typeof getLists;
  token: TwitterTokenResponse;
  response: NextApiResponse;
  params: object;
}

export async function twitterApi({
  provider,
  token,
  response,
  params,
}: TwitterApiHandler) {
  try {
    const lists = await provider({
      userAccessToken: token.accessToken,
      userAccessTokenSecret: token.accessTokenSecret,
      params,
    });

    response.json(lists);
    response.end();
  } catch (e) {
    // @ts-expect-error
    response.status(500).json({ error: e.errors });
  }
}
