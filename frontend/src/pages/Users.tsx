import React from "react";
import UsersList from "../components/users/UsersList";
import User from "../models/UserModel";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useAxios from "../hooks/useAxios";

const Users: React.FC = () => {
  const [users, setUsers] = React.useState<User[] | null>(null);

  const { isLoading, error, sendRequest, clearError } = useAxios();

  React.useEffect(() => {
    sendRequest<User[]>(`${process.env.REACT_APP_BACKEND_URL}/api/users`).then(
      (data) => {
        setUsers(data);
      }
    );
  }, [sendRequest]);

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        users && <UsersList items={users} />
      )}
    </>
  );
};

export default Users;
