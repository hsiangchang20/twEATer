import { gql } from 'apollo-boost'

export const FOLLOW_MUTATION = gql`
  mutation follow(
    $id: ID!
    $follower: ID!
    $followerName: String!
  ) {
    follow(
        id: $id
        follower: $follower
        followerName: $followerName
    ) {
        followerName
    }
  }
`