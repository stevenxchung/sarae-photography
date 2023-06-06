import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const isGalleryPage = pathname === "/gallery";
  const imageRemMultiplier = 25;

  return (
    <nav>
      <ul className="flex justify-between">
        {/* Empty to even out spaces */}
        <li></li>
        <li className="ml-12">
          <Link href={`/`} className="hover:opacity-75">
            <Image
              className="animate-fade-in-slow"
              src={`/logo.png`}
              alt="Landing page background"
              width={16 * imageRemMultiplier}
              height={16 * imageRemMultiplier}
            ></Image>
          </Link>
        </li>
        <li>
          <Link
            href={isGalleryPage ? `/about` : `/gallery`}
            className="hover:opacity-75"
          >
            <h2 className="animate-fade-in-slow text-xl">
              {isGalleryPage ? `About` : `Gallery`}
            </h2>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
