import { NextApiHandler } from "next";
import { getLists } from "@src/twitter-calls/client";
import { twitterTokenFromRequest } from "@src/twitter-calls/twitterTokenFromRequest";
import { twitterApi } from "@src/twitter-calls/twitterApi";

const getListsAPI: NextApiHandler = async (request, response) => {
  try {
    const token = twitterTokenFromRequest(request);
    twitterApi({
      provider: getLists,
      token,
      response,
      params: {
        screen_name: token.screenName,
      },
    });
  } catch (e) {
    // @ts-expect-error
    response.status(401).send(e.message);
  }
};

export default getListsAPI;
