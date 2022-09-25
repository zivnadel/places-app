import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import Button from "../ui/formElements/Button";

const NavLinks: React.FC = () => {
  const authContext = React.useContext(AuthContext);

  return (
    <ul className="list-none m-0 p-0 w-full h-full flex flex-col justify-center items-center md:flex-row">
      <li className="m-4 md:my-0 md:mx-4">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/"
        >
          ALL USERS
        </NavLink>
      </li>
      {authContext?.isLoggedIn ? (
        <>
          <li className="m-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
              to={`/${authContext.uid}/places`}
            >
              MY PLACES
            </NavLink>
          </li>
          <li className="m-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
              to="/places/new"
            >
              ADD PLACE
            </NavLink>
          </li>
          <li className="m-4">
            <Button onClick={authContext.logout}>LOGOUT</Button>
          </li>
        </>
      ) : (
        <li className="m-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
            to="/auth"
          >
            AUTHENTICATE
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
