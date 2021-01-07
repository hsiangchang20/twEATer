import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default function Searches() {
    const RestaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const restaurants_list = RestaurantIDs.map((i, index) => (
        <li key={index}>
            <NavLink to={"/restaurant/" + i}>
                Restaurant #{i}
            </NavLink>
        </li>
    ));
    return (
        <div>
            <h3>Search Results ---</h3>
            {restaurants_list}
        </div>
    );
}
/*
export default class Searches extends Component {
    render() {
        const RestaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
        const restaurants_list = RestaurantIDs.map((i, index) => (
            <li key={index}>
                <NavLink to={"/restaurant/" + i}>
                    Restaurant #{i}
                </NavLink>
            </li>
        ));
        return (
            <div>
                <h3>Search Results ---</h3>
                {restaurants_list}
            </div>
        );
    }
}
*/
