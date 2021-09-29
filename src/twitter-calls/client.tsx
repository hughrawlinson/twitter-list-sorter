const { TwitterOAuth } = require("twitter-auth-await");
import Twitter from "twitter-lite";

const TWITTER_API_HOST = `https://api.twitter.com`;
const TWITTER_API_KEY = process.env["TWITTER_API_KEY"] as string;
const TWITTER_API_SECRET = process.env["TWITTER_API_SECRET"] as string;
const REDIRECT_URI =
  process.env["REDIRECT_URI"] ||
  `https://${process.env["PROJECT_DOMAIN"]}.glitch.me/auth/callback/twitter`;

switch (true) {
  case typeof TWITTER_API_KEY === "undefined":
    throw new Error("You must provide a TWITTER_API_KEY as an env var");
  case typeof TWITTER_API_SECRET === "undefined":
    throw new Error("You must provide a TWITTER_API_SECRET as an env var");
}

const twitterAuthClient = new TwitterOAuth({
  consumerKey: process.env["TWITTER_API_KEY"],
  consumerSecret: process.env["TWITTER_API_SECRET"],
  callback: REDIRECT_URI,
});

interface MakeTwitterGetParams {
  path: string;
  params: object;
  token: string;
  tokenSecret: string;
  method?: "GET" | "POST";
}

async function makeTwitterGet({
  path,
  params,
  token,
  tokenSecret,
  method,
}: MakeTwitterGetParams) {
  const twitterApiClient = new Twitter({
    subdomain: "api",
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret,
  });

  return twitterApiClient.get(path, params);
}

async function getRedirectAuthURI() {
  const twitterRedirectUri = await twitterAuthClient.getRedirectAuthURI();

  return twitterRedirectUri;
}

interface GetAccessTokenParams {
  oauthToken: string;
  oauthVerifier: string;
}

async function getAccessToken({
  oauthToken,
  oauthVerifier,
}: GetAccessTokenParams) {
  const response = await twitterAuthClient.getAccessToken(
    oauthToken,
    oauthVerifier
  );
  return response;
}

interface GetListsParams {
  userAccessToken: string;
  userAccessTokenSecret: string;
  params: object;
}

async function getLists({
  userAccessToken,
  userAccessTokenSecret,
  params,
}: GetListsParams) {
  return makeTwitterGet({
    path: "lists/list",
    token: userAccessToken,
    tokenSecret: userAccessTokenSecret,
    params,
  });
}

type GetListMembersParams = GetListsParams;

async function getListMembers({
  userAccessToken,
  userAccessTokenSecret,
  params,
}: GetListMembersParams) {
  return makeTwitterGet({
    path: "lists/members",
    token: userAccessToken,
    tokenSecret: userAccessTokenSecret,
    params,
  });
}

type GetFriendsParams = GetListsParams;

async function getFriends({
  userAccessToken,
  userAccessTokenSecret,
  params,
}: GetListMembersParams) {
  return makeTwitterGet({
    path: "friends/list",
    method: "POST",
    token: userAccessToken,
    tokenSecret: userAccessTokenSecret,
    params,
  });
}

type GetFollowersParams = GetListsParams;

async function getFollowers({
  userAccessToken,
  userAccessTokenSecret,
  params,
}: GetFollowersParams) {
  return makeTwitterGet({
    path: "followers/list",
    method: "POST",
    token: userAccessToken,
    tokenSecret: userAccessTokenSecret,
    params,
  });
}

export {
  getRedirectAuthURI,
  getAccessToken,
  getLists,
  getListMembers,
  getFriends,
  getFollowers,
};
