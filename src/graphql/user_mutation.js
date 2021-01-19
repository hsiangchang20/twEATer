import { gql } from 'apollo-boost'

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $fruit: Int!
  ) {
    createUser(data: {
        name: $name
        email: $email
        password: $password
        fruit: $fruit
    }){
        name
    }
  }
`