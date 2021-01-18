import { gql } from 'apollo-boost'

export const POST_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data{
        _id
        thumb
      }
    }
  }
`
