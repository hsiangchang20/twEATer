import { gql } from 'apollo-boost'

export const DELETE_MESSAGE = gql`
  mutation deleteMessage(
    $id: ID!
  ) {
    deleteMessage(
        id: $id
    ) {
        follower
    }
  }
`