import useSWRInfinite from "swr/infinite";
import { LoadingFailure } from ".";
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

export function useTwitterFriends():
  | LoadingFailure
  | TwitterListMembers[]
  | undefined {
  const twitterToken = useTwitterToken();

  const { data, error } = useSWRInfinite<TwitterListMembers>(
    (pageIndex, previousPageData: any) => {
      if (pageIndex === 0) return "useTwitterFriends.firstfriends";
      if (!previousPageData.next_cursor_str) {
        return null;
      }
      return previousPageData.next_cursor_str;
    },
    async (next_cursor: string) => {
      const url =
        next_cursor === "useTwitterFriends.firstfriends"
          ? `/api/twitter/friends`
          : `/api/twitter/friends?${new URLSearchParams({ next_cursor })}`;
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${twitterToken}`,
        },
      });

      const result = await response.json();
      return validateTwitterListMembers(result);
    },
    { initialSize: 5 }
  );

  if (error) {
    return {
      _type: "LoadingFailure",
      reason: error.message,
    };
  }

  return data;
}
