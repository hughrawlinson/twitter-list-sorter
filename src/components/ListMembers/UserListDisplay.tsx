import { TwitterListMembers } from "@src/hooks/useTwitterListMembers";
import { ProfileCard } from "../ProfileCard";

export type UserListDisplayProps = {
  members?: TwitterListMembers["users"];
  name: string;
  member_count: number;
};

export function UserListDisplay({
  name,
  member_count,
  members,
}: UserListDisplayProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{member_count} members</p>
      {!members ? (
        <p>List members loading...</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li>
              <ProfileCard user={member} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
