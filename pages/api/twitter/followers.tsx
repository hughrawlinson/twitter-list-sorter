import { NextApiHandler, NextApiRequest } from "next";
import { getFollowers } from "@src/twitter-calls/client";
import { twitterTokenFromRequest } from "@src/twitter-calls/twitterTokenFromRequest";
import { twitterApi } from "@src/twitter-calls/twitterApi";

const getListsAPI: NextApiHandler = async (
  request: NextApiRequest,
  response
) => {
  try {
    const token = twitterTokenFromRequest(request);
    let params: { screen_name: string; count: number; cursor?: string } = {
      screen_name: token.screenName,
      count: 200,
    };
    if (request.query.next_cursor) {
      params.cursor = request.query.next_cursor as string;
    }
    await twitterApi({
      provider: getFollowers,
      token,
      response,
      params,
    });
  } catch (e) {
    // @ts-expect-error
    response.status(401).send(e.message).end();
  }
};

export default getListsAPI;
