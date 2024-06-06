import { gql } from '@apollo/client';

export const SEARCH_BOOKS = gql`
  query searchBooks($query: String!) {
    searchBooks(query: $query) {
      id
      title
      authors
      description
      image
    }
  }
`;

export const GET_ME = gql`
query Query($username: String!) {
  user(username: $username) {
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