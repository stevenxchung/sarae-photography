import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Gallery: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <main>
        <Link href={`/`}>
          <h1 className="text-center text-4xl">Gallery</h1>
        </Link>
      </main>
    </>
  );
};

export default Gallery;
