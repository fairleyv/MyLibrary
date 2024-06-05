import {gql} from '@apollo/client';

export const CREATE_USER = gql`
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

export const LOGIN = gql `
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`

export const SAVE_BOOK = gql `
mutation Mutation($bookId: String!, $username: String) {
  saveBook(bookId: $bookId, username: $username) {
    username
    email
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`

export const REMOVE_BOOK = gql `
mutation Mutation($bookId: String!, $username: String) {
  saveBook(bookId: $bookId, username: $username) {
    username
    email
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`

