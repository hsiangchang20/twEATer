import { gql } from 'apollo-boost'

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation createPost(
    $name: String!
    $address: String!
    $Openhours: String!
    $tele: String!
    $type: String!
    $time: String
    $cost: String
    $staple: String
    $location: String
    $Star: String
  ) {
    createRestaurant(data: {
        name: $name
        type: $type
        Openhours: $Openhours
        address: $address
        tele: $tele
        time: $time
        cost: $cost
        staple: $staple
        location: $location
        Star: $Star
    }){
        name
    }
  }
`