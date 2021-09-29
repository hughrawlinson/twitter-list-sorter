import { NextApiHandler } from "next";
import { getFollowers } from "@src/twitter-calls/client";
import { twitterTokenFromRequest } from "@src/twitter-calls/twitterTokenFromRequest";
import { twitterApi } from "@src/twitter-calls/twitterApi";

const getListsAPI: NextApiHandler = async (request, response) => {
  try {
    const token = twitterTokenFromRequest(request);
    twitterApi({
      provider: getFollowers,
      token,
      response,
      params: {
        screen_name: token.screenName,
        count: 200,
      },
    });
  } catch (e) {
    // @ts-expect-error
    response.status(401).send(e.message);
  }
};

export default getListsAPI;
