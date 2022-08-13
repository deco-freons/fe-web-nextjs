import React from "react";
import Pot from "../../public/teapot.svg";
import Cup from "../../public/cup.svg";
import Droplet from "../../public/droplet.svg";

const Teapot = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="group relative w-72 h-72">
        <Pot className="w-72 h-72 cursor-pointer fill-neutral-100 transform -scale-x-100 animate-pour sm:group-hover:animate-pour sm:animate-none" />
        <Cup className="absolute left-1/2 bottom-0 w-20 h-20 transform -scale-x-100 animate-slide sm:group-hover:animate-slide sm:animate-none opacity-0" />
        <Droplet className="absolute left-1/2 bottom-0 w-6 h-6 animate-drop0 sm:group-hover:animate-drop0 sm:animate-none opacity-0" />
        <Droplet className="absolute left-1/2 bottom-0 w-6 h-6 animate-drop1 sm:group-hover:animate-drop1 sm:animate-none opacity-0" />
        <Droplet className="absolute left-1/2 bottom-0 w-6 h-6 animate-drop2 sm:group-hover:animate-drop2 sm:animate-none opacity-0" />
        <p className="text-center font-medium transition-opacity opacity-0 group-hover:opacity-100 delay-[3.5s] duration-1000 mt-1">
          The HTTP 418 I&apos;m a teapot client error response code indicates
          that the server refuses to brew coffee because it is, permanently, a
          teapot.
        </p>
      </div>
    </div>
  );
};

export default Teapot;
