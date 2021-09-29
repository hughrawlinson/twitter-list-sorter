import { isLoadingFailure, useUsersTwitterLists } from "@src/hooks";
import { ListFollowers, ListMembers, ListFriends } from "@src/components";

export function ListOfLists() {
  const lists = useUsersTwitterLists();

  if (!lists) {
    return <h1>Loading...</h1>;
  }

  if (isLoadingFailure(lists)) {
    return <h1>Loading error: {lists.reason}</h1>;
  }

  if (!Array.isArray(lists)) {
    return <h1>Not a loading failure, but not a list?</h1>;
  }

  return (
    <>
      <ListFriends />
      <ListFollowers />
      {lists.map((list) => (
        <ListMembers key={list.id} list={list} />
      ))}
    </>
  );
}
