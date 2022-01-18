import { isLoadingFailure, TwitterListsResponse } from "@src/hooks";
import { useTwitterListMembers } from "@src/hooks/useTwitterListMembers";
import { UserListDisplay } from "./UserListDisplay";

interface ListMembersProps {
  list: TwitterListsResponse[number];
}

export const ListMembers = ({ list }: ListMembersProps) => {
  const members = useTwitterListMembers({
    listId: "" + list.id,
    ownerId: "" + list.user.id,
    slug: list.slug,
  });

  if (isLoadingFailure(members) || typeof members === "undefined") {
    return <h3>Failed to load list members for {list.name}</h3>;
  }
  return (
    <UserListDisplay
      name={list.name}
      member_count={list.member_count}
      members={members?.users}
    />
  );
};
