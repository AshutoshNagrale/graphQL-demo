import { gql } from "@apollo/client";

export const LoadAllUsers = gql`
  query {
    getAllUsers {
      id
      firstName
      email
      password
    }
  }
`;
