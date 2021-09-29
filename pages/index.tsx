import Head from "next/head";
import { ListOfLists, LoginPrompt } from "../src/components";
import { useTwitterIsLoggedIn } from "../src/hooks";
import styles from "../styles/Home.module.css";

export default function Home() {
  const isLoggedIn = useTwitterIsLoggedIn();

  function HomeMain({ ...props }) {
    if (isLoggedIn) {
      return <ListOfLists {...props} />;
    }
    return <LoginPrompt {...props} />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter List Sorter</title>
        <meta
          name="description"
          content="A thing to sort the people you follow on Twitter into lists."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Twitter List Sorter</h1>
        <HomeMain />
      </main>
    </div>
  );
}
