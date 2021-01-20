import { gql } from 'apollo-boost'

export const USER_QUERY = gql`
  query users(
    $query: String
  ) {
    users (
      query : $query
    ){
        _id
        name
        email
        password
        fruit
        posts{
          body
        }
        Like
    }
  } 
`