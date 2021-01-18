import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $authorID: ID!
    $body: String!
    $photo: String!
    $restaurant: String!
    $thumb: Int!
  ) {
    createPost(
      data: {
        authorID: $authorID
        body: $body
        photo: $photo
        restaurant: $restaurant
        thumb: $thumb
      }
    ) {
        body
        restaurant
        photo
        authorID
        users{
            name
        }
    }
  }
`