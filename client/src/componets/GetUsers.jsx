import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { LoadAllUsers } from "../GraphQL/Queries";

const GetUsers = () => {
  const { error, loading, data } = useQuery(LoadAllUsers);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      console.log(data.getAllUsers);
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const dispalyUser = (user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
    </tr>
  );
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>{users && users.map((user) => dispalyUser(user))}</tbody>
      </table>
    </>
  );
};

export default GetUsers;
