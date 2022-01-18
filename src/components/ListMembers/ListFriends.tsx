import { isLoadingFailure, useTwitterFriends } from "@src/hooks";
import { UserListDisplay } from "./UserListDisplay";

export const ListFriends = () => {
  const members = useTwitterFriends();
  if (isLoadingFailure(members) || typeof members === "undefined") {
    return <h3>Failed to load followers</h3>;
  }

  const users = members.flatMap((m) => m.users).filter(Boolean);

  return (
    <UserListDisplay
      name="Friends"
      member_count={users?.length || 0}
      members={users}
    />
  );
};
