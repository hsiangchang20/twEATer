import { gql } from 'apollo-boost'

export const UNLIKE_MUTATION = gql`
  mutation unLike(
    $PostID: String!
    $userId: String!
  ) {
    unLike(
        PostID: $PostID
        userId: $userId
    ) {
        thumb
    }
  }
`