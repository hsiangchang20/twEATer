import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Posts extends Component {
    render() {
        const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
        const posts_list = postIDs.map((i, index) => (
            <li key={index}>
                <NavLink to={"/post/" + i}>
                    dao {i}
                </NavLink>
            </li>
        ));
        return (
            <div>
                <h3>
                    Posts
                </h3>
                {posts_list}
            </div>
        )
    }
}