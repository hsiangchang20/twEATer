import { gql } from 'apollo-boost'

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $fruit: Int!
    $password: String!
  ) {
    updateUser(id: $id, data: {
        name: $name
        password: $password
        fruit: $fruit
    }){
        name
    }
  }
`