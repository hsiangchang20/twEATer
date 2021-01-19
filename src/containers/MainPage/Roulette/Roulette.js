import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './css/roulette.css'
import rouletteImg from './image/roulette.png'
import { Fireworks } from 'fireworks/lib/react'

export default function Roulette() {
    // -webkit-animation:spin 1s linear infinite; -moz-animation:spin 1s linear infinite; animation:spin 1s linear infinite;
    const [animation, setAnimation] = useState({})
    const [restaurant, SetRestaurant] = useState('')
    const [fireworks, setFireworks] = useState(false)
    const [firstspin, setFirstspin] = useState(true)

    function spinAnimate() {
        SetRestaurant('')
        setAnimation({"WebkitAnimation":"spin 1s linear infinite", "MozAnimation":"spin 1s linear infinite", "animation":"spin 1s linear infinite"})
        window.setTimeout(( () => {
            setAnimation({});
            chooseRestaurant();
        }), 3000);
    }

    function chooseRestaurant(){
        SetRestaurant('五福餃子')
        if (firstspin) {
            setFireworks(true)
            setInterval(() => setFireworks(false), 5000)
        }
        setFirstspin(false)
    }

    const fxProps = {
        count: 3,
        interval: 700,
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
        colors: ['#cc3333', '#81C784'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) * Math.random(),
            y: window.innerHeight * Math.random()
        })
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
            {fireworks ? (<Fireworks {...fxProps}/>) : null}
        </div>
    )
}