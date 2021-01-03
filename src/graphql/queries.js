import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
  query messages(
    $name: String!
  ) {
    messages (
      query : $name
    ){
      sender
      receiver
      body
    }
  }
`
