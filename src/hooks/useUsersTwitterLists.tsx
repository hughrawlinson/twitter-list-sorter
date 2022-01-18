import { useEffect, useState } from "react";
import useSWR from "swr";
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

export function useUsersTwitterLists():
  | LoadingFailure
  | TwitterListsResponse
  | undefined {
  const twitterToken = useTwitterToken();
  const { data, error, isValidating, mutate } = useSWR<TwitterListsResponse>(
    "userlists",
    async () => {
      const response = await fetch("/api/twitter/lists/", {
        headers: {
          authorization: `Bearer ${twitterToken}`,
        },
      });
      const result = await response.json();
      return validateTwitterListsResponse(result);
    }
  );
  if (error) {
    return {
      _type: "LoadingFailure",
      reason: error.message,
    };
  }
  return data;
}
