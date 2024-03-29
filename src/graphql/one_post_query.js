import { gql } from 'apollo-boost'

export const ONE_POST_QUERY = gql`
  query posts(
    $query: String
  ) {
    posts (
      query : $query
    ){
        authorID
		    _id
        body
        time
        restaurant
        photo
        thumb
        users{
            name
            fruit
        }
        comments{
            Author
            body
            time
            user{
              name
              fruit
            }
        }
    }
  }
`