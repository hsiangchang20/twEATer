import React from "react";
import { NavLink } from "react-router-dom";
import './css/searches.css'
import searchLogo from './image/search.PNG'

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
        <div className="s007">
            <form>
                <div className="inner-form">
                    <div className="basic-search">
                        <div className="input-field">
                            <div className="icon-wrap">
                                <img src={searchLogo} />
                            </div>
                            <input className='search-input' type="text" placeholder="Search..." />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                    <div className="advance-search">
                        <span className="desc">Advanced Search</span>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner">
                                        <option placeholder="" value="">TYPE</option>
                                        <option>Taiwanese</option>
                                        <option>American</option>
                                        <option>Japanese</option>
                                        <option>Italian</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner">
                                        <option placeholder="" value="">TIME</option>
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                <select data-trigger="" className="choices__inner">
                                    <option placeholder="" value="">COST</option>
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
                                    <select data-trigger="" className="choices__inner">
                                        <option placeholder="" value="">Staple</option>
                                        <option>Rice</option>
                                        <option>Noodle</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner">
                                        <option placeholder="" value="">Location</option>
                                        <option>Taiwan</option>
                                        <option>South Africa</option>
                                        <option>Republic of Sierra Leone</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select data-trigger="" className="choices__inner">
                                        <option placeholder="" value="">Star</option>
                                        <option>5</option>
                                        <option>3~5</option>
                                        <option>Under 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row third">
                            <div className="input-field">
                                <button className="btn-search">Search</button>
                                <button className="btn-delete" id="delete">Delete</button>
                            </div>
                        </div>
                    </div>
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
