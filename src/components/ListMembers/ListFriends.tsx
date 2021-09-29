import { isLoadingFailure, useTwitterFriends } from "@src/hooks";
import { UserListDisplay } from "./UserListDisplay";

export const ListFriends = () => {
  const members = useTwitterFriends();
  if (isLoadingFailure(members)) {
    return <h3>Failed to load followers</h3>;
  }
  return (
    <UserListDisplay
      name="Friends"
      member_count={(members && members?.users?.length) || 0}
      members={members?.users}
    />
  );
};
