import React from "react";
import loginLogo from "./images/logo.png"
import { NavLink } from "react-router-dom";
import './css/main.css'
import './css/util.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './vendor/animate/animate.css'
import './vendor/css-hamburgers/hamburgers.min.css'
import './vendor/select2/select2.min.css'

function loginPage(props) {
    return(
        <div>
            <title>Login V1</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={loginLogo} alt="IMG" />
                        </div>                    
                        <form className="login100-form validate-form">
                            <span className="login100-form-title">
                                Login
                            </span>
        
                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
        
                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={props.onClick}>
                                    <NavLink to="/post">Login</NavLink>
                                </button>
                            </div>
        
                            <div className="text-center p-t-12">
                                <span className="txt1">
                                    Forgot
                                </span>
                                <a className="txt2" href="#" onClick="forget()">
                                    Username / Password?
                                </a>
                            </div>
                            <div className="text-center p-t-12">
                                <span className="txt2" style={{visibility: "hidden",}} id="forget">
                                    你是<a href="#" onClick="showPassword()">忘記</a>了，還是<a href="#" onClick="NoneOfMyBusiness()">害怕想起來</a>？
                                </span>
                            </div>
                            <div className="text-center p-t-12">
                                <span className="txt3" style={{visibility: "hidden"}} id="forgetThen">
                                </span>
                            </div>
                            <div className="popping-img">
                                <img src="images/popping.gif" alt="IMG" id="poppingImg" style={{visibility: "hidden"}} />
                            </div>
                            <div className="text-center p-t-20">
                                <a className="txt2" href="#">
                                    Create your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
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
        </div>
    );
};

export default loginPage