import UsersList from "../components/users/UsersList";

const Users: React.FC = () => {
  const DUMMY_USERS = [
    {
      id: "u1",
      name: "zivziv",
      image:
        "https://images.unsplash.com/photo-1662496167579-675de58d766a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      places: 3,
    },
  ];

  return <UsersList items={DUMMY_USERS} />;
};

export default Users;
