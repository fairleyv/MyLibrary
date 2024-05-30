import {gql} from '@apollo/client';

export const createUser = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
    }
  }
}
`

