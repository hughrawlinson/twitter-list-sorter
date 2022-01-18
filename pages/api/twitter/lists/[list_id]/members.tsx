import { NextApiHandler } from "next";
import { getListMembers } from "@src/twitter-calls/client";
import { twitterTokenFromRequest } from "@src/twitter-calls/twitterTokenFromRequest";
import { twitterApi } from "@src/twitter-calls/twitterApi";

const getListAPI: NextApiHandler = async (request, response) => {
  try {
    const token = twitterTokenFromRequest(request);
    await twitterApi({
      provider: getListMembers,
      token,
      response,
      params: {
        // screen_name: token.screenName,
        // list_id: request.query.list_id,
        slug: request.query.slug,
        owner_id: request.query.owner_id,
        count: 500,
      },
    });
  } catch (e) {
    // @ts-expect-error
    response.status(401).send(e.message).end();
  }
};

export default getListAPI;
