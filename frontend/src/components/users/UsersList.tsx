import UserModel from "../../models/UserModel";
import Card from "../ui/Card";
import UserItem from "./UserItem";

interface Props {
  items: UserModel[];
}

const UsersList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card>
        <h2>No users found.</h2>
      </Card>
    );
  }

  return (
    <ul className="list-none my-0 mx-auto p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap">
      {items.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
