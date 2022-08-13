import { NextPage } from "next";
import Link from "next/link";
import Frown from "../public/frown.svg";

const Custom404: NextPage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center overflow-hidden">
      <Frown className={"w-40 h-40"} />
      <h1 className="text-8xl font-bold mb-3 mt-6">404</h1>
      <h2 className="text-2xl font-semibold my-3">Page Not Found</h2>
      <p>The Page you are looking for does not exists!</p>

      <Link href="/">
        <a className="underline">Go To Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
