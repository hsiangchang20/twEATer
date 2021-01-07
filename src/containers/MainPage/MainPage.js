import React, { useState, useEffect } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import Searches from "./Searches/Searches";
import PostsRender from "./Posts/PostsRender";
import Restaurant from "./Restaurants/Restaurant"

import LoginLogo from "./Login/images/logo.png"
import LoginIcon from "./Login/images/icons/favicon.ico"

export default function MainPage() {

    const [login, setLogin] = useState(false);

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
                // <div>
                    // <button onClick={() => setLogin(true)}>
                    //     <NavLink to="/post">Login</NavLink>
                    // </button >
                // </div>
                <div>
                    <head>
                        <title>Login V1</title>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" type="image/png" href={LoginIcon}/>
                        <link rel="stylesheet" type="text/css" href="./Login/vendor/bootstrap/css/bootstrap.min.css" />
                        <link rel="stylesheet" type="text/css" href="./Login/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
                        <link rel="stylesheet" type="text/css" href="./Login/vendor/animate/animate.css" />
                        <link rel="stylesheet" type="text/css" href="./Login/vendor/css-hamburgers/hamburgers.min.css" />
                        <link rel="stylesheet" type="text/css" href="./Login/vendor/select2/select2.min.css" />
                        <link rel="stylesheet" type="text/css" href="./Login/css/util.css" />
                    </head>
                    <body>
                        <div class="limiter">
                            <div class="container-login100">
                                <div class="wrap-login100">
                                    <div class="login100-pic js-tilt" data-tilt>
                                        <img src={LoginLogo} alt="IMG" />
                                    </div>                    
                                    <form class="login100-form validate-form">
                                        <span class="login100-form-title">
                                            Login
                                        </span>
                    
                                        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                            <input class="input100" type="text" name="email" placeholder="Email" />
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-envelope" aria-hidden="true"></i>
                                            </span>
                                        </div>
                    
                                        <div class="wrap-input100 validate-input" data-validate = "Password is required">
                                            <input class="input100" type="password" name="pass" placeholder="Password" />
                                            <span class="focus-input100"></span>
                                            <span class="symbol-input100">
                                                <i class="fa fa-lock" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        
                                        <div class="container-login100-form-btn">
                                            <button class="login100-form-btn">
                                                Login
                                            </button>
                                        </div>
                    
                                        <div class="text-center p-t-12">
                                            <span class="txt1">
                                                Forgot
                                            </span>
                                            <a class="txt2" href="#" onclick="forget()">
                                                Username / Password?
                                            </a>
                                        </div>
                                        <div class="text-center p-t-12">
                                            <span class="txt2" style={{visibility: "hidden",}} id="forget">
                                                你是<a href="#" onclick="showPassword()">忘記</a>了，還是<a href="#" onclick="NoneOfMyBusiness()">害怕想起來</a>？
                                            </span>
                                        </div>
                                        <div class="text-center p-t-12">
                                            <span class="txt3" style={{visibility: "hidden"}} id="forgetThen">
                                            </span>
                                        </div>
                                        <div class="popping-img">
                                            <img src="images/popping.gif" alt="IMG" id="poppingImg" style={{visibility: "hidden"}} />
                                        </div>
                                        <div class="text-center p-t-20">
                                            <a class="txt2" href="#">
                                                Create your Account
                                                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>     
                        <script src="./Login/vendor/jquery/jquery-3.2.1.min.js"></script>
                        <script src="./Login/vendor/bootstrap/js/popper.js"></script>
                        <script src="./Login/vendor/bootstrap/js/bootstrap.min.js"></script>
                        <script src="./Login/vendor/select2/select2.min.js"></script>
                        <script src="./Login/vendor/tilt/tilt.jquery.min.js"></script>
                        <script src="./Login/js/main.js"></script>
                    </body>
                </div>
            )
    );
}
