import { gql } from 'apollo-boost'

export const RESTAURANT_QUERY = gql`
  query restaurant(
    $name: String!
  ) {
    restaurant (
      name: $name
    ){
        name
        tele
        Openhours
        address
        type
        menu
        posts{
        body
            users{
                name
            }
        }
    }
  }
`