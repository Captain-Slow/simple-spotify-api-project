import Head from "next/head";

import LoginComponent from "../components/home/LoginComponent";

function Home() {
  return (
    <>
      <Head>
        <title>nowPlaying by Kew - Home</title>
      </Head>
      <LoginComponent />
    </>
  );
}

export default Home;
