import User from "../../models/UserModel";
import Avatar from "../ui/Avatar";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

interface Props {
  user: User;
}

const UserItem: React.FC<Props> = ({ user }) => {
  return (
    <li className="m-4 w-[calc(45%-2rem)] min-w-[17.5rem]">
      <Card className="p-0">
        <Link
          to={`/${user.id}/places`}
          className="group flex items-center w-full h-full p-4 text-white bg-dark hover:bg-primary active:bg-primary"
        >
          <div className="w-16 h-16 mr-4">
            <Avatar image={user.image} alt={user.name} />
          </div>
          <div>
            <h2 className="text-3xl mb-2 text-secondary group-hover:text-light">
              {user.name}
            </h2>
            <h3 className="m-0 font-semibold group-hover:text-light">
              {user.places} {user.places === 1 ? "Places" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
