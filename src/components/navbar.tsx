import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const isGalleryPage = pathname === "/gallery";
  const imageSize = 16 * 25;

  const navText = (
    <h2 className="animate-fade-in-medium text-xl">
      {isGalleryPage ? `About` : `Gallery`}
    </h2>
  );

  return (
    <nav>
      <ul className="flex flex-wrap justify-between gap-8 sm:flex-col md:flex-row md:justify-center">
        {/* Transparent to even out spaces */}
        <li className="mx-auto text-transparent md:ml-2 md:mt-2">{navText}</li>
        <li className="mx-auto">
          <Link href={`/`} className="hover:opacity-75">
            <Image
              className="animate-fade-in-medium"
              src={`/logo.png`}
              alt="Landing page background"
              width={imageSize}
              height={imageSize}
            />
          </Link>
        </li>
        <li className="mx-auto md:mr-2 md:mt-2">
          <Link
            href={isGalleryPage ? `/about` : `/gallery`}
            className="hover:opacity-75"
          >
            {navText}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
