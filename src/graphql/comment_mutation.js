import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createComment(
    $body: String!
    $Author: String!
    $authorID: String!
    $PostID: Int!
  ) {
    createComment(
      data: {
        body: $body
        Author: $Author
        authorID: $authorID
        POstID: $PostID
      }
    ) {
        authorID
        body
    }
  }
`