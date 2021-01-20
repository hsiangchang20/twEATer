import { gql } from 'apollo-boost'

export const POST_QUERY = gql`
  query posts(
    $query: String
  ) {
    posts (
      query : $query
    ){
        _id
        body
        time
        restaurant
        photo
        authorID
        users{
            name
            furit
        }
    }
  }
`