import React, { useState} from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import ScriptTag from 'react-script-tag'
import './mainpage.css'

import Posts from "./Posts/Posts";
import Searches from "./Searches/Searches";
import PostsRender from "./Posts/PostsRender";
import Restaurant from "./Restaurants/Restaurant";

import LoginPage from "./Login/loginPage"

export default function MainPage() {

    const [login, setLogin] = useState(false);
    return (
        <div>
            <title>Login V1</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="limiter">
                <div className="container-background100">
                    {login ?
                        (<div>
                            <button className="main-button">
                                <NavLink to="/post" className="main-button-text">Post</NavLink>
                            </button>
                            <button className="main-button">
                                <NavLink to="/search" className="main-button-text">Search</NavLink>
                            </button>
                            <button className="main-button">
                                <NavLink to="/roulette" className="main-button-text">Roulette</NavLink>
                            </button>
                            <button className="main-button">
                                <NavLink to="/add" className="main-button-text">Add</NavLink>
                            </button>
                            <button className="main-button">
                                <NavLink to="/user" className="main-button-text">User</NavLink>
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
                        )}
                </div>
            </div>     
            <ScriptTag src="./vendor/jquery/jquery-3.2.1.min.js"></ScriptTag>
            <ScriptTag src="./vendor/bootstrap/js/popper.js"></ScriptTag>
            <ScriptTag src="./vendor/bootstrap/js/bootstrap.min.js"></ScriptTag>
            <ScriptTag src="./vendor/select2/select2.min.js"></ScriptTag>
            <ScriptTag src="./vendor/tilt/tilt.jquery.min.js"></ScriptTag>
            
            <ScriptTag src="./js/main.js"></ScriptTag>
        </div>
    )
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
