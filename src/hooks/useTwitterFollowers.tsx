import useSWRInfinite from "swr/infinite";
import { LoadingFailure } from ".";
import { useTwitterToken } from "./useTwitterToken";

export type TwitterListMembers = {
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
  next_cursor?: number;
  next_cursor_str?: string;
};

function validateTwitterListMembers(o: any): TwitterListMembers {
  // TODO: implement this validation
  return o as TwitterListMembers;
}

export function useTwitterFollowers():
  | LoadingFailure
  | TwitterListMembers[]
  | undefined {
  const twitterToken = useTwitterToken();

  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData: any) => {
      console.log(pageIndex);
      console.log(previousPageData);
      if (pageIndex === 0) return "first";
      if (!previousPageData.next_cursor_str) {
        return null;
      }
      return previousPageData.next_cursor_str;
    },
    async (next_cursor: string) => {
      const url =
        next_cursor === "first"
          ? `/api/twitter/followers`
          : `/api/twitter/followers?${new URLSearchParams({
              next_cursor,
            }).toString()}`;
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${twitterToken}`,
        },
      });

      const result = await response.json();
      return validateTwitterListMembers(result);
    }
  );
  if (error) {
    return {
      _type: "LoadingFailure",
      reason: error.message,
    };
  }
  // if (data && data[data.length - 1]?.next_cursor) {
  //   setSize(size + 1);
  // }
  return data;
}
