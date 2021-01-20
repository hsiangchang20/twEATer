import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
  query message{
    message{
      _id
      body
      author
      follower
      followerName
      date
      restaurant
      users{
        name
        fruit
      }
      limit  
    }
  }
`
