import { gql } from 'apollo-boost'

export const LIKE_MUTATION = gql`
  mutation Like(
    $PostID: String!
    $userId: String!
  ) {
    Like(
        PostID: $PostID
        userId: $userId
    ) {
        thumb
    }
  }
`