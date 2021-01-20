import { gql } from 'apollo-boost'

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    message {
      mutation
      data{
        _id
        follower
        followerName
      }
    }
  }
`