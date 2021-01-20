import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
  query messages{
    _id
    body
    author
    follower
    followerName
    date
    users{
      name
    }
  }
`
