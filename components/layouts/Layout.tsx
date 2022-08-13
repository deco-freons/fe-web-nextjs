import { ReactNode } from "react";
import Navbar from "./Navbar";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="container h-full">{children}</main>
    </>
  );
};

export default Layout;
