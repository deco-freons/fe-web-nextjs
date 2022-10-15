import type { NextPage } from "next";
import Image from "next/image";
import Logo from "../public/logo.svg";
import GooglePlayBadge from "../public/google-play-badge.png";
import AppStoreBadge from "../public/app-store-badge.svg";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <Logo className=" w-full sm:w-[640px] h-64" />
      <div className="flex justify-center items-center">
        <div className="w-36 sm:w-48 cursor-pointer min-w">
          <Image
            layout="responsive"
            alt="Get it on Google Play"
            src={GooglePlayBadge}
            priority={true}
          />
        </div>
        <AppStoreBadge className="w-[7.5rem] sm:w-40 h-14 ml-2 sm:ml-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default Home;
