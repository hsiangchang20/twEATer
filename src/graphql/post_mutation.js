import { gql } from 'apollo-boost'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $authorID: String!
    $body: String!
    $photo: String!
    $restaurant: String!
    $thumb: Int!
  ) {
    createMessage(
      data: {
        authorID: $authorID
        body: $body
        photo: $photo
        restaurant: $restaurant
        thumb: $thumb
      }
    ) {
        body
        time
        restaurant
        photo
        authorID
        users{
            name
        }
    }
  }
`