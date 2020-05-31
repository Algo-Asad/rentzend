import gql from "graphql-tag";
import {SignUpFormKeys} from "../components/Home/Home.form";


export const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const createUserMutation = gql`
mutation (
    $${SignUpFormKeys.Name}: String!,
    $${SignUpFormKeys.Email}: String!,
    $${SignUpFormKeys.Address}: String!,
    $${SignUpFormKeys.Zip}: String!,
    $${SignUpFormKeys.Phone}: String!,
    $${SignUpFormKeys.Files}: [String]!
) {
  addUser (
    name: $${SignUpFormKeys.Name},
    email: $${SignUpFormKeys.Email},
    address: $${SignUpFormKeys.Address},
    zip: $${SignUpFormKeys.Zip},
    phoneNumber: $${SignUpFormKeys.Phone},
    files: $${SignUpFormKeys.Files}
  ) {
    name
  }
}
`;
