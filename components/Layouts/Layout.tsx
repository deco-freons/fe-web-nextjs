import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <main className="container h-full">{children}</main>
    </>
  );
};

export default Layout;
