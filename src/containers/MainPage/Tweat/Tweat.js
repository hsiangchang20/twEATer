import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fruits from "../fruits/fruits";
import "./tweat.css";

export default function tweat(props){

    const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
	const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]


    const tweats = [0, 1].map(tweat => (
        <div className="wrap-tweat100" key={tweat}>
            <div className="tweats-overview">
                <div className="tweats-userdata">
                    <img src={apple} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{"tweat.users[0].name"}</p>
                    </div>
                </div>
                <div className="tweats-restaurant">
                        <NavLink to={"/restaurant/" + 'restaurant' + "/" + 'userid'}>
                            <p>{"< " + "restaurant" + " >"}</p>
                        </NavLink>
                </div>
                <table>
                    <tbody>
                        <tr className="tweats-container-header">
                            <td>
                                Reserved Time
                            </td>
                            <td>
                                Attenders
                            </td>
                        </tr>
                        <tr className="tweats-container">
                            <td>
                                ??minutes left
                            </td>
                            <td>
                                ?? Qouta left
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="tweats-body">
                    <p>Tweat Body</p>
                </div>
                <div className='tweats-likeOrResponse'>  
                    <div className="tweats-like">
                        <button onClick={/*()=>Like(tweat._id)*/console.log("nothing")} className="tweats-btn">
                            <p>Join</p>
                        </button>
                    </div>
                    <div className="tweats-response">
                    </div>
                </div>
            </div>
        </div>        
    ));
    return tweats
}