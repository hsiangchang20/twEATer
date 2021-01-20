import { gql } from 'apollo-boost'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation sendMessage(
    $body: String!
    $author: ID!
    $restaurant: String!
    $date: String!
    $limit: Int!
  ) {
    sendMessage(
      data: {
        body: $body
        author: $author
        restaurant: $restaurant
        date: $date
        limit: $limit
      }
    ) {
      author
      body
    }
  }
`