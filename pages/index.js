import Nav from "@/components/Nav";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  function handleGoogleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleGoogleSignOut }) : Guest()}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, handleGoogleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGoogleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          href={"/profile"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Profile Page
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

/* export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 w-screen h-screen">
      <Nav />
      <div>logged in {session.user.email}</div>
    </div>
  );
} */
