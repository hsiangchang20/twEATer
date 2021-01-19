import React, { useEffect, useState } from "react";
import {RESTAURANT_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";

export default function Restaurant(props) {
    const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;
    const { loading, error, data} = useQuery(RESTAURANT_QUERY, {variables: {name: id}});
    const [rest, {loading2, data2}] = useLazyQuery(RESTAURANT_QUERY)
    const [restaurant, setRestaurant] = useState('dao')
    useEffect(()=>{
        console.log(data)
        
        if (data)
            setRestaurant(data.restaurant[0])
    })
    return restaurant&&(id === restaurant.name) ? (
        <article>
            <h1>Restaurant {id}</h1>
            <p>Type: {restaurant.type}</p>
            <p>Telephone: {restaurant.tele}</p>
            <p>Address: {restaurant.address}</p>
            <p>Openhours: {restaurant.Openhours}</p>
        </article>
    ) : (
            <div>
                <h3>Error: Restaurant #{id} NOT FOUND</h3>
            </div>
        )
}
/*
{
    render() {
        const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
        const { id } = this.props.match.params;
        return id && restaurantIDs.includes(id) ? (
            <article>
                <h1>Restaurant #{id}</h1>
                <p>This is the {id}-th restaurant</p>
            </article>
        ) : (
                <div>
                    <h3>Error: Restaurant #{id} NOT FOUND</h3>
                </div>
            )
    }
}
*/