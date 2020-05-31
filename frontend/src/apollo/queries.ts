import gql from "graphql-tag";

export const getAllUsers = gql`{
users {
    id
    name
    email
    phoneNumber
    address
    zip
    files
  }
}`
