import { useShortProfileToggle } from "@src/features/ShortProfileButton";
import { TwitterListMembers } from "@src/hooks";
import { Fragment } from "react";

interface ProfileCardProps {
  user: TwitterListMembers["users"][number];
}

export function ProfileCard({ user }: ProfileCardProps) {
  const { showShortProfile } = useShortProfileToggle();
  if (showShortProfile) {
    return (
      <a key={user.id} href={`https://twitter.com/${user.screen_name}`}>
        {user.name}
      </a>
    );
  }
  return (
    <Fragment key={user.id}>
      <a href={`https://twitter.com/${user.screen_name}`}>{user.name}</a>
      <p>@{user.screen_name}</p>
      {user?.entities?.url?.urls.map((url) => (
        <a href={url.url}>{url.display_url}</a>
      ))}
      <div>
        <p>{user.description}</p>
      </div>
      <p>Followers: {user.followers_count}</p>
      <p>Friends: {user.friends_count}</p>
      <p>{user.location}</p>
      <p>{user.protected && "Private account"}</p>
    </Fragment>
  );
}
