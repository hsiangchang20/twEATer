import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import './css/roulette.css'
import rouletteImg from './image/roulette.png'
import { Fireworks } from 'fireworks/lib/react'
import {RESTAURANT_QUERY} from '../../../graphql'
import {useQuery} from '@apollo/client'

export default function Roulette(props) {
    const { userid } = props.match.params
    // -webkit-animation:spin 1s linear infinite; -moz-animation:spin 1s linear infinite; animation:spin 1s linear infinite;
    const [animation, setAnimation] = useState({})
    const [restaurant, SetRestaurant] = useState('')
    const [fireworks, setFireworks] = useState(false)
    const [firstspin, setFirstspin] = useState(true)
    const { loading, error, data, refetch} = useQuery(RESTAURANT_QUERY, {variables: {name: "", type: "", time: "", cost: "", staple: "", location: "", Star: ""}});
    const [rest, setRest] = useState([])
    const [init, setInit] = useState(true);

    useEffect(()=>{
        console.log(data);
        if(data)
            setRest(data.restaurant.map(res=>(res.name))); 
    }, [data])

    useEffect(()=>{
        if(init){
            refetch();
            setInit(false);
        }
    })

    function spinAnimate() {
        SetRestaurant('')
        setAnimation({"WebkitAnimation":"spin 1s linear infinite", "MozAnimation":"spin 1s linear infinite", "animation":"spin 1s linear infinite"})
        window.setTimeout(( () => {
            setAnimation({});
            chooseRestaurant();
        }), 3000);
    }

    function chooseRestaurant(){
        SetRestaurant(rest[Math.floor(Math.random()*Math.floor(rest.length))])
        if (firstspin) {
            setFireworks(true)
            setInterval(() => setFireworks(false), 2000)
        }
        setFirstspin(false)
    }

    const fxProps = {
        count: 3,
        interval: 200,
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
                <button className="result">
                    <NavLink to={"/restaurant/" + restaurant + "/" + userid} className="posts-readmore">
                        {restaurant ? (<p>{"< " + restaurant + " >"}</p>) : <p></p>}
                        
                    </NavLink>
                </button>
            </div>
            {/* {fireworks ? (<Fireworks {...fxProps}/>) : null} */}
        </div>
    )
}