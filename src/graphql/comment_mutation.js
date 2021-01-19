import { gql } from 'apollo-boost'

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment(
    $body: String!
    $Author: String!
    $authorID: ID!
    $PostID: ID!
  ) {
    createComment(
      data: {
        body: $body
        Author: $Author
        authorID: $authorID
        PostID: $PostID
      }
    ) {
        authorID
        body
    }
  }
`