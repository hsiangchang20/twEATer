import React, { useEffect, useState } from "react";
import "./restaurant.css";
import {RESTAURANT_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";

export default function Restaurant(props) {
    //const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { name } = props.match.params;
    const { loading, error, data} = useQuery(RESTAURANT_QUERY, {variables: {name: name}});
    const [rest, {loading2, data2}] = useLazyQuery(RESTAURANT_QUERY)
    const [restaurant, setRestaurant] = useState('dao')
    const [photo, setPhoto] = useState('')
    useEffect(()=>{    
        console.log(data)    
        if (data && (data.restaurant[0])){
            setRestaurant(data.restaurant[0]);
            if (data.restaurant[0].posts[0]){
                setPhoto(data.restaurant[0].posts[0].photo)
            }
            
        }
    })

    const restaurant_view = (restaurant === 'dao') ? (<div className="name"><p>Restaurant does not exist</p></div>) : (
        <div className="wrap-restaurant">
            <div className="name">
                <p>{'< ' + restaurant.name + ' >'}</p>
            </div>
            {photo!==""?<img src={photo}></img>:""}
            <div className="info">
                <p>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.type}</p>
                <p>Telephone&ensp;&nbsp;:&nbsp;&nbsp; {restaurant.tele}</p>
                <p>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.address}</p>
                <p>Openhours&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.Openhours}</p>
            </div>
        </div>
    )

    return (loading || error) ? (<></>) : restaurant_view;
}