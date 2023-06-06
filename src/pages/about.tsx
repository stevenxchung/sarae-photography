import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "~/components/navbar";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <main className="min-h-screen bg-black px-6 py-6">
        <Navbar></Navbar>
      </main>
    </>
  );
};

export default About;
