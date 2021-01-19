import React from "react";
import "./restaurant.css";

export default function Restaurant(props) {
    const restaurant_view = (
        <div className="wrap-restaurant">
            <div className="name">
                <p>{'< ' + 'post.restaurant' + ' >'}</p>
            </div>
            <div className="info">
                <p>Types:</p>
                <p>Telephone:</p>
                <p>Address:</p>
                <p>Openhours:</p>
            </div>
        </div>
    )

    return restaurant_view;
}