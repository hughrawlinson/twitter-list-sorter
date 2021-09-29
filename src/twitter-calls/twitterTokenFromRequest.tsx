import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export interface TwitterTokenResponse {
  accessToken: string;
  accessTokenSecret: string;
  userId: string;
  screenName: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export function twitterTokenFromRequest(
  request: NextApiRequest
): TwitterTokenResponse {
  if (!request.headers.authorization) {
    throw new Error("Not authorized");
  }
  const bearerValue = request.headers.authorization.split(" ")[1];
  try {
    const jwtPayload = jwt.verify(bearerValue, JWT_SECRET);
    console.log(jwtPayload);
    if (typeof jwtPayload === "string") {
      throw new Error("Jwt is verified, but payload is garbled");
    }
    return validateTwitterTokenResponse(jwtPayload.data);
  } catch (e) {
    // @ts-expect-error
    throw new Error(e);
  }
}

// This should be unknown but the error is just "this value is unknown", not
// "here's the type incompatibility", and I can't remember how to refine that
// type right now.

export function validateTwitterTokenResponse(o: any): TwitterTokenResponse {
  o = o && !!o.twitterAccessToken ? o.twitterAccessToken : o;
  switch (true) {
    case (o && !o.accessToken) || typeof o.accessToken !== "string":
      throw new Error("Twitter token response doesn't contain accessToken");
    case o && !o.accessTokenSecret && typeof o.accessTokenSecret !== "string":
      throw new Error(
        "Twitter token response doesn't contain accessTokenSecret"
      );
    case o && !o.userId && typeof o.userId !== "string":
      throw new Error("Twitter token response doesn't contain userId");
    case o && !o.screenName && typeof o.screenName !== "string":
      throw new Error("Twitter token response doesn't contain screenName");
  }
  return o as TwitterTokenResponse;
}
