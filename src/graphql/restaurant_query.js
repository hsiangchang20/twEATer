import { gql } from 'apollo-boost'

export const RESTAURANT_QUERY = gql`
  query restaurant(
    $name: String!
    $type: String
    $time: String
    $cost: String
    $staple: String
    $location: String
    $Star: String
  ) {
    restaurant (
      name: $name
      type: $type
      time: $time
      cost: $cost
      staple: $staple
      location: $location
      Star: $Star
    ){
        name
        tele
        Openhours
        address
        type
        menu
        posts{
          authorID
          _id
          body
          time
          restaurant
          photo
          thumb
          users{
            name
            fruit
          }
          comments{
            Author
            body
            time
          }
        }
    }
  }
`