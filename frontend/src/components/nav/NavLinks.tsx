import { NavLink } from "react-router-dom";

const NavLinks: React.FC = () => {
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
      <li className="m-4">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/u1/places"
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
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/auth"
        >
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
