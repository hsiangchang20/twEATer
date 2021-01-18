import React from "react";
import { NavLink } from "react-router-dom";
import './css/roulette.css'
import rouletteImg from './image/roulette.png'

export default function Roulette() {
    
    return (
        <div>
            <div className="rotateImg">
                <img src={rouletteImg} />
            </div>
        </div>
    )
}