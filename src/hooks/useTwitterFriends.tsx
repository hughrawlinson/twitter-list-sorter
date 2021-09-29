import { useEffect, useState } from "react";
import { LoadingFailure } from "./LoadingFailure";
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
  const [twitterListMembers, setTwitterListMembers] = useState<
    null | TwitterListMembers | LoadingFailure
  >(null);

  const twitterToken = useTwitterToken();

  useEffect(() => {
    let updateResult = true;

    if (twitterListMembers === null) {
      (async () => {
        const response = await fetch(`/api/twitter/friends`, {
          headers: {
            authorization: `Bearer ${twitterToken}`,
          },
        });

        if (!response.ok) {
          return setTwitterListMembers({
            _type: "LoadingFailure",
            reason: await response.text(),
          });
        }

        const result = await response.json();
        if (updateResult) {
          setTwitterListMembers(validateTwitterListMembers(result));
        }
      })();
    }

    return function cancelFetchHandler() {
      updateResult = false;
    };
  }, [twitterListMembers, setTwitterListMembers]);

  return twitterListMembers;
}
