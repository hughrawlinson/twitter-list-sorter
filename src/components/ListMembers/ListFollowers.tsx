import { isLoadingFailure, useTwitterFollowers } from "@src/hooks";
import { UserListDisplay } from "./UserListDisplay";

export const ListFollowers = () => {
  const members = useTwitterFollowers();
  if (isLoadingFailure(members) || typeof members === "undefined") {
    return <h3>Failed to load followers</h3>;
  }
  const users = members.flatMap((m) => m.users).filter(Boolean);
  return (
    <UserListDisplay
      name="Followers"
      member_count={(members && users.length) || 0}
      members={users}
    />
  );
};
