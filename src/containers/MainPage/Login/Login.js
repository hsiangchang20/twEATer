import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
    return(
        <div>
            <button onClick={() => setLogin(true)}>
                <NavLink to="/post">Login</NavLink>
            </button >
        </div>
    )
}