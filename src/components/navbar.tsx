import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const imageRemMultiplier = 25;

  return (
    <nav className="flex justify-center">
      <ul>
        <Link href={`/`} className="hover:opacity-75">
          <Image
            className="animate-fade-in-slow"
            src={`/logo.png`}
            alt="Landing page background"
            width={16 * imageRemMultiplier}
            height={16 * imageRemMultiplier}
          ></Image>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
