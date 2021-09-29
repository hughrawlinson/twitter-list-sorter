import { TwitterListMembers } from "@src/hooks/useTwitterListMembers";

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
              <a href={`https://twitter.com/${member.screen_name}`}>
                {member.name}
              </a>
              <p>@{member.screen_name}</p>
              {member?.entities?.url?.urls.map((url) => (
                <a href={url.url}>{url.display_url}</a>
              ))}
              <div>
                <p>{member.description}</p>
              </div>
              <p>Followers: {member.followers_count}</p>
              <p>Friends: {member.friends_count}</p>
              <p>{member.location}</p>
              <p>{member.protected && "Private account"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
