import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "~/components/navbar";

import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";

interface GalleryProps {
  images: string[];
}

const Gallery: NextPage<GalleryProps> = ({ images }) => {
  const [loadedRows, setLoadedRows] = useState<number>(0);

  useEffect(() => {
    const delayBetweenRows = 1000; // Delay in milliseconds between loading each row

    const timer = setTimeout(() => {
      setLoadedRows((prevRows) => prevRows + 1);
    }, delayBetweenRows);

    return () => {
      clearTimeout(timer);
    };
  }, [loadedRows]);

  const visibleImages = images.slice(0, loadedRows * 3);

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <main className="min-h-screen bg-black px-6 py-6">
        <Navbar />
        <br />
        <div className="grid grid-cols-3 gap-6">
          {visibleImages.map((imageUrl, index) => (
            <div
              key={index}
              className="animate-fade-in-slow col-span-4 overflow-hidden bg-gray-200 sm:col-span-2 md:col-span-1"
            >
              <Image
                key={index}
                src={`/cropped/${imageUrl}`}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-cover"
                width={1000}
                height={1000}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<GalleryProps> = () => {
  const imageDirectory = path.join(process.cwd(), "public", "cropped");
  const images = fs.readdirSync(imageDirectory);

  return {
    props: {
      images,
    },
  };
};

export default Gallery;
