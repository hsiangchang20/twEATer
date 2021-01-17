import { gql } from 'apollo-boost'

export const LOGIN_QUERY = gql`
  query login(
    $email: String!
    $password: String!
  ) {
    login (
      data : {
          email: $email
          password: $password
      }
    ){
      name
      _id
      fruit
      
    }
  }
`