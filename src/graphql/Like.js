import { gql } from 'apollo-boost'

export const LIKE_MUTATION = gql`
  mutation Like(
    $PostID: String!
  ) {
    Like(
        PostID: $PostID
    ) {
        thumb
    }
  }
`