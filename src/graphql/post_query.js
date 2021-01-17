import { gql } from 'apollo-boost'

export const POST_QUERY = gql`
  query posts(
    $query: String
  ) {
    posts (
      query : $query
    ){
        body
        time
        restaurant
        photo
        authorID
        users{
            name
        }
    }
  }
`