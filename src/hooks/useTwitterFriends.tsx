import useSWR from "swr";
import { useTwitterToken } from "./useTwitterToken";

type TwitterListMembers = {
  users: {
    id: number;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: string;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    profile_image_url_https: string;
    entities: {
      url: {
        urls: {
          url: string;
          display_url: string;
        }[];
      };
    };
  }[];
};

function validateTwitterListMembers(o: any): TwitterListMembers {
  // TODO: implement this validation
  return o as TwitterListMembers;
}

export function useTwitterFriends() {
  const twitterToken = useTwitterToken();

  const { data, error } = useSWR("friends", async () => {
    const response = await fetch(`/api/twitter/friends`, {
      headers: {
        authorization: `Bearer ${twitterToken}`,
      },
    });

    const result = await response.json();
    return validateTwitterListMembers(result);
  });

  if (error) {
    return {
      _type: "LoadingFailure",
      reason: error.message,
    };
  }

  return data;
}
