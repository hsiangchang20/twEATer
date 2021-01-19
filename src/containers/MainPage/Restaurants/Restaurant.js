import React, { useEffect, useState } from "react";
import "./restaurant.css";
import {RESTAURANT_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";

export default function Restaurant(props) {
    const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { name } = props.match.params;
    console.log(props)
    const { loading, error, data} = useQuery(RESTAURANT_QUERY, {variables: {name: name}});
    const [rest, {loading2, data2}] = useLazyQuery(RESTAURANT_QUERY)
    const [restaurant, setRestaurant] = useState('dao')
    useEffect(()=>{
        console.log(data)
        
        if (data)
            setRestaurant(data.restaurant[0])
    })

    const restaurant_view = (
        <div className="wrap-restaurant">
            <div className="name">
                <p>{'< ' + restaurant.name + ' >'}</p>
            </div>
            <div className="info">
                <p>Type: {restaurant.type}</p>
                <p>Telephone: {restaurant.tele}</p>
                <p>Address: {restaurant.address}</p>
                <p>Openhours: {restaurant.Openhours}</p>
            </div>
        </div>
    )

    return restaurant_view;
}