import React, {useState} from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
//import ScriptTag from 'react-script-tag'
import './mainpage.css'

import Posts from "./Posts/Posts";
import Searches from "./Searches/Searches";
import PostsRender from "./Posts/PostsRender";
import Restaurant from "./Restaurants/Restaurant";
import Roulette from "./Roulette/Roulette";
import LoginPage from "./Login/loginPage";
import Profile from "./Profile/Profile";

import Add from "./Add/Add"

export default function MainPage() {

    const [login, setLogin] = useState(false);
    const [userdata, setUserdata] = useState([]);
    return (
        <div>
            <title>Login V1</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="limiter">
                <div className="container-background100">
                    {login ?
                        (<div>
                            <div id='menu-wrapper'>
                                <div id='menu'>
                                    <ul>
                                        <li>
                                            <button className="main-button">
                                                <NavLink to="/post" className="main-button-text">Post</NavLink>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="main-button">
                                                <NavLink to="/search" className="main-button-text">Search</NavLink>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="main-button">
                                                <NavLink to="/roulette" className="main-button-text">Roulette</NavLink>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="main-button">
                                                <NavLink to="/add" className="main-button-text">Add</NavLink>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="main-button">
                                                <NavLink to={"/profile/" + userdata._id} className="main-button-text">Profile</NavLink>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div id='wrapper'>
                                <Switch>
                                    <Route exact path="/post" component={Posts} />
                                    <Route path="/post/:id?" component={PostsRender} />
                                    <Route exact path="/search" component={Searches} />
                                    <Route exact path="/roulette" component={Roulette} />
                                    <Route path="/restaurant/:id?" component={Restaurant} />
                                    <Route exact path="/add" component={Add} />
                                    <Route path="/profile/:id?" component={Profile}/>
                                    <Redirect from="/home" to="/" />
                                </Switch>
                            </div>
                        </div>
                        ) : (
                            <LoginPage onClick={(data) => {
                                if (data !== undefined) {
                                    setLogin(true);
                                    setUserdata(data.login)
                                }
                                //else console.log(data);
                            }} />
                        )}
                </div>
            </div>
        </div>
    )
    /*
    <ScriptTag src="./vendor/jquery/jquery-3.2.1.min.js"></ScriptTag>
    <ScriptTag src="./vendor/bootstrap/js/popper.js"></ScriptTag>
    <ScriptTag src="./vendor/bootstrap/js/bootstrap.min.js"></ScriptTag>
    <ScriptTag src="./vendor/select2/select2.min.js"></ScriptTag>
    <ScriptTag src="./vendor/tilt/tilt.jquery.min.js"></ScriptTag>
    <ScriptTag src="./js/main.js"></ScriptTag>
    */
    /*
    return (
        login ?
            (<div>
                <button>
                    <NavLink to="/post">Post</NavLink>
                </button>
                <button>
                    <NavLink to="/search">Search</NavLink>
                </button>
                <button>
                    <NavLink to="/roulette">Roulette</NavLink>
                </button>
                <button>
                    <NavLink to="/add">Add</NavLink>
                </button>
                <button>
                    <NavLink to="/user">User</NavLink>
                </button>
                <hr />
                <Switch>
                    <Route exact path="/post" component={Posts} />
                    <Route path="/post/:id?" component={PostsRender} />
                    <Route exact path="/search" component={Searches} />
                    <Route path="/restaurant/:id?" component={Restaurant} />
                    <Redirect from="/home" to="/" />
                </Switch>
            </div>
            ) : (
                <LoginPage onClick={() => setLogin(true)} />
            )
    );
    */
}
