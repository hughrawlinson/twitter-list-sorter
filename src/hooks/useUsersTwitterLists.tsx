import { useEffect, useState } from "react";
import { LoadingFailure } from "./LoadingFailure";
import { useTwitterToken } from "./useTwitterToken";

export type TwitterListsResponse = {
  name: string;
  id: number;
  member_count: number;
  slug: string;
  user: {
    id: number;
  };
}[];

function validateTwitterListsResponse(o: any): TwitterListsResponse {
  // TODO: implement this validation
  return o as TwitterListsResponse;
}

export function useUsersTwitterLists() {
  const [usersTwitterLists, setUsersTwitterLists] = useState<
    null | TwitterListsResponse | LoadingFailure
  >(null);

  const twitterToken = useTwitterToken();

  useEffect(() => {
    let updateResult = true;

    if (usersTwitterLists === null) {
      (async () => {
        const response = await fetch("/api/twitter/lists/", {
          headers: {
            authorization: `Bearer ${twitterToken}`,
          },
        });

        if (!response.ok) {
          return setUsersTwitterLists({
            _type: "LoadingFailure",
            reason: await response.text(),
          });
        }

        const result = await response.json();
        if (updateResult) {
          setUsersTwitterLists(validateTwitterListsResponse(result));
        }
      })();
    }

    return function cancelFetchHandler() {
      updateResult = false;
    };
  }, [usersTwitterLists, setUsersTwitterLists]);

  return usersTwitterLists;
}
