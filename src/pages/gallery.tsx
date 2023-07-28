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
  const totalRows = Math.ceil(images.length / 3); // Calculate the total number of rows
  const delayBetweenRows = 1000; // Delay in milliseconds between loading each row

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedRows((prevRows) => Math.min(prevRows + 1, totalRows));
    }, delayBetweenRows);

    return () => {
      clearTimeout(timer);
    };
  }, [loadedRows, totalRows]);

  const visibleImages = images.slice(0, loadedRows * 3);

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <main className="min-h-screen bg-black px-6 py-8">
        <Navbar />
        <div className="mt-8 grid grid-cols-3 gap-6">
          {visibleImages.map((imageUrl, index) => (
            <div
              key={index}
              className="col-span-3 animate-fade-in-medium overflow-hidden bg-gray-200 sm:col-span-1"
            >
              <Image
                key={index}
                src={`/cropped/${imageUrl}`}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-cover"
                width={500}
                height={500}
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
  const images = fs.readdirSync(imageDirectory).sort((a, b) => {
    const aNumber = parseInt(a, 10);
    const bNumber = parseInt(b, 10);

    return aNumber - bNumber;
  });

  return {
    props: {
      images,
    },
  };
};

export default Gallery;
