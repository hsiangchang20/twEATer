import { gql } from 'apollo-boost'

export const COMMENT_SUBSCRIPTION = gql`
  subscription 
    comment(
        $postId: ID!
    ) {
        comment(
            postId: $postId
        )
        {
            mutation
            data {
                Author
                body
                user{
                    fruit
                }
            }
        }
    }
  
`