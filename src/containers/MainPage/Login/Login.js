import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage(props) {
    return(
        <div>
            <button onClick={props.onClick}>
                <NavLink to="/post">Login</NavLink>
            </button >
        </div>
    )
}