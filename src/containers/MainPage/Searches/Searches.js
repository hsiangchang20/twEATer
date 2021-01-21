import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './css/searches.css'
import './font-awesome-4.7.0/css/font-awesome.css'
import {RESTAURANT_QUERY} from '../../../graphql'
import { useLazyQuery } from "@apollo/client";
import { getDefaultNormalizer } from "@testing-library/react";

export default function Searches(props) {
    const {userid} = props.match.params;
    const [Search, {loading, data}] = useLazyQuery(RESTAURANT_QUERY);
    const [restaurantData, setRestaurantData] = useState([])
    const [Restaurant, SetRestaurant] = useState('')
    const [type, setType] = useState('');
    const [time, setTime] = useState('');
    const [cost, setCost] = useState('');
    const [staple, setStaple] = useState('');
    const [location, setLocation] = useState('');
    const [Star, setStar] = useState('');
    const [searched, setSearched] = useState(false);

    const selectType = (event) => {
        setType(event.target.value)
    }

    const selectTime = (event) => {
        setTime(event.target.value)
    }

    const selectCost = (event) => {
        setCost(event.target.value)
    }

    const selectStaple = (event) => {
        setStaple(event.target.value)
    }

    const selectLocation = (event) => {
        setLocation(event.target.value)
    }

    const selectStar = (event) => {
        setStar(event.target.value)
    }


    const restaurantList = restaurantData.map(restaurant => (
        <div className="restaurant-container" key={restaurant.name}>
            <div className="restaurant-title">
                {restaurant.name}
            </div>
            <div className="restaurant-label">
                Telephone: {restaurant.tele}
            </div>
            <div className="restaurant-label">
                Address: {restaurant.address}
            </div>
            <div className="restaurant-label">
                Openhours: {restaurant.Openhours}
            </div>
            <NavLink to={"/restaurant/" + restaurant.name + "/" + userid} className="post-restaurant-info">
                 查看餐廳資訊
            </NavLink>
        </div>
        )
    );

    const NoData = (
        <div className="restaurant-container">
            <div className="restaurant-label">
                No Corresponding Restaurant Yet!
            </div>
            <div className="restaurant-label">
                Please Add Posts to Help us Build the Society~~~
            </div>
        </div>
    )


    useEffect(()=>{
        //console.log(data);
        if (data!==undefined) {setRestaurantData(data.restaurant)}
        console.log(restaurantData)
    }, [loading, data, restaurantData])

    return (
        <div className="s007">
            <form>
                <div className="inner-form">
                    <div className="basic-search">
                        <div className="input-field">
                            <input  className='search-input' 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={Restaurant} 
                                    onChange={(e)=>{ SetRestaurant(e.target.value)} }
                            />
                            <div className="focus-input100"></div>
                            <span className="symbol-input100">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div className="advance-search">
                    <link 
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" 
                        rel="stylesheet"  type='text/css'/>
                        <span className="desc">Advanced Search</span>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner fa" onChange={selectType}>
                                        <option placeholder="" value="">&#xf1b1; TYPE</option>
                                        <option>Taiwanese</option>
                                        <option>American</option>
                                        <option>Japanese</option>
                                        <option>Italian</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner fa" onChange={selectTime}>
                                        <option placeholder="" value="">&#xf017; TIME</option>
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                <select data-trigger="" className="choices__inner fa" onChange={selectCost}>
                                    <option placeholder="" value="">&#xf155; COST</option>
                                    <option>Under $100</option>
                                    <option>$100~$200</option>
                                    <option>$200~$300</option>
                                    <option>Over $300</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div className="row second">
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner fa" onChange={selectStaple}>
                                        <option placeholder="" value="">&#xf0f4; STAPLE</option>
                                        <option>Rice</option>
                                        <option>Noodle</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner fa" onChange={selectLocation}>
                                        <option placeholder="" value="">&#xf024; LOCATION</option>
                                        <option>Taiwan</option>
                                        <option>South Africa</option>
                                        <option>Republic of Sierra Leone</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner fa" onChange={selectStar}>
                                        <option placeholder="" value="">&#xf005; STAR</option>
                                        <option>5</option>
                                        <option>3~5</option>
                                        <option>Under 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row third">
                            <div className="input-field">
                                <button className="btn-search" onClick={(e)=>{
                                    setSearched(true)
                                    e.preventDefault();
                                    Search({ variables: { name: Restaurant,  type:type, time: time, cost: cost, staple: staple, location: location, Star: Star} });
                                }}>Search</button>
                            </div>
                        </div>
                    </div>
                {restaurantList}
                {(restaurantData.length || !searched) ? <></> : NoData}
                </div>
            </form>   
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
