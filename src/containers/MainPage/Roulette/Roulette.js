import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './css/roulette.css'
import rouletteImg from './image/roulette.png'

export default function Roulette() {
    // -webkit-animation:spin 1s linear infinite; -moz-animation:spin 1s linear infinite; animation:spin 1s linear infinite;
    const [animation, setAnimation] = useState({})
    const [restaurant, SetRestaurant] = useState('')

    function spinAnimate() {
        setAnimation({"WebkitAnimation":"spin 1s linear infinite", "MozAnimation":"spin 1s linear infinite", "animation":"spin 1s linear infinite"})
        window.setTimeout(( () => {
            setAnimation({});
            chooseRestaurant();
        }), 3000);
    }

    function chooseRestaurant(){
        SetRestaurant('五福餃子')
    }

    return (
        <div className="roulette-wrapper">
            <div className="btn-wrapper">
                <button className="btn-roulette" onClick={spinAnimate}>I'M FEELING LUCKY</button>
            </div>
            <div className="rotateImg" style={animation}>
                <img src={rouletteImg} />
            </div>
            <div className="result-wrapper">
                <button className="result">{restaurant}</button>
            </div>
        </div>
    )
}