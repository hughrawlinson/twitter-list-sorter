import { isLoadingFailure, useTwitterFollowers } from "@src/hooks";
import { UserListDisplay } from "./UserListDisplay";

export const ListFollowers = () => {
  const members = useTwitterFollowers();
  if (isLoadingFailure(members)) {
    return <h3>Failed to load followers</h3>;
  }
  return (
    <UserListDisplay
      name="Followers"
      member_count={(members && members?.users?.length) || 0}
      members={members?.users}
    />
  );
};
