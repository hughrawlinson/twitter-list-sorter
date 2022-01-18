import Link from "next/link";

export function LoginPrompt() {
  return (
    <div>
      <h2>Oh hi,</h2>
      <p>Let&apos;s sort the people you follow on Twitter into lists.</p>
      <Link href={`/api/auth/redirect/twitter`}>Log in with Twitter</Link>
    </div>
  );
}
