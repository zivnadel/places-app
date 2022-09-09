import React from "react";

import { Link } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNav: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      <MainHeader>
        <button
          onClick={openDrawerHandler}
          className="w-12 h-12 bg-transparent border-none flex flex-col justify-around mr-5 cursor-pointer md:hidden"
        >
          <span className="block w-full h-full bg-white my-1" />
          <span className="block w-full h-full bg-white my-1" />
          <span className="block w-full h-full bg-white my-1" />
        </button>
        <Link
          className="text-white h-full w-72 flex justify-center items-center"
          to="/"
        >
          <img src="logo-no-background.svg" alt="Logo" />
        </Link>
        <nav className="hidden md:block">
          <NavLinks />
        </nav>
      </MainHeader>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer onClick={closeDrawerHandler} show={drawerIsOpen}>
        <nav className="h-full">
          <NavLinks />
        </nav>
      </SideDrawer>
    </>
  );
};

export default MainNav;
