import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "~/components/navbar";

const About: NextPage = () => {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setIsImageVisible(true);
    }, 1000);

    const textTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 2000);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <main className="min-h-screen bg-black px-6 py-8">
        <Navbar />
        <br />
        <div className="my-8 flex flex-col items-center">
          {isImageVisible && (
            <>
              <Image
                className="my-12 animate-fade-in-medium"
                src={`/profile.jpg`}
                alt="Landing page background"
                width={800}
                height={800}
                priority={true}
              />
              {isTextVisible && (
                <div className="animate-fade-in-medium">
                  <div className="text-xl">
                    Hello,
                    <div className="my-8">
                      My name is Sarae, I love hiking and exploring all that
                      nature has to offer.
                      <br />
                      Welcome to my photography website!
                    </div>
                    Go Hokies!
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default About;
