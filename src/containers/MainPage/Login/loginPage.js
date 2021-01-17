import React, {useState, useEffect} from "react";
import ScriptTag from 'react-script-tag'
import loginLogo from "./images/logo.png"
import poppingImg from "./images/popping.gif"
import { NavLink } from "react-router-dom";
import './css/main.css'
import './css/util.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './vendor/animate/animate.css'
import './vendor/css-hamburgers/hamburgers.min.css'
import './vendor/select2/select2.min.css'
import {LOGIN_QUERY} from '../../../graphql'
import { useLazyQuery } from "@apollo/client";

function LoginPage(props) {
    const [forgetPasswordPressed, setForgetPasswordPressed] = useState('none');
    const [forgetPressed, setForgetPressed] = useState('none');
    const [afraidPressed, setAfraidPressed] = useState('none')
    const [poppingPressed, setPoppingPressed] = useState('none');
    const [poppingDoublePressed, setPoppingDoublePressed] = useState('none');
    const [email, setEmail] = useState('');
    const [password, setPW] = useState('');
    const [Login, {loading, data}] = useLazyQuery(LOGIN_QUERY);
    useEffect( ()=> {
        console.log(data);
        props.onClick(data);
    }, [data])

    useEffect( ()=> {
        console.log(email, password);
    }, [email, password])
    /*
    return(
        <div>
            <title>Login V1</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="limiter">
                <div className="container-login100">
                    
                </div>
            </div>     
            <ScriptTag src="./vendor/jquery/jquery-3.2.1.min.js"></ScriptTag>
            <ScriptTag src="./vendor/bootstrap/js/popper.js"></ScriptTag>
            <ScriptTag src="./vendor/bootstrap/js/bootstrap.min.js"></ScriptTag>
            <ScriptTag src="./vendor/select2/select2.min.js"></ScriptTag>
            <ScriptTag src="./vendor/tilt/tilt.jquery.min.js"></ScriptTag>
            
            <ScriptTag src="./js/main.js"></ScriptTag>
        </div>
    );
    */
    return (
        <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
                <img src={loginLogo} alt="IMG" />
            </div>                    
            <form className="login100-form validate-form">
                <span className="login100-form-title">
                    Login
                </span>

                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input  className="input100" 
                            type="text" 
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e)=>{ setEmail(e.target.value)} }
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" dataValidation = "Password is required">
                    <input  className="input100" 
                            type="password" 
                            name="pass" 
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>{setPW(e.target.value)}}
                    />
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                </div>
                
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn" onClick={(e)=>{
                        e.preventDefault();
                        Login({ variables: { email: email, password: password } });
                    }}>
                        <NavLink to="/post" style={{fontFamily: 'Montserrat-Bold', color: "white", fontSize: "12pt"}}>Login</NavLink>
                    </button>
                </div>

                <div className="text-center p-t-12">
                    <span className="txt1">
                        Forgot{' '}
                    </span>
                    <a className="txt2" href="#" onClick={() => setForgetPasswordPressed('')}>
                        Username / Password?
                    </a>
                </div>
                <div className="text-center p-t-12">
                    <span className="txt2" style={{visibility: forgetPasswordPressed,}} id="forget">
                        你是<a href="#" onClick={() => {setForgetPressed(''); setAfraidPressed('none'); setPoppingPressed('none'); setPoppingDoublePressed('none')}}>忘記</a>了，還是<a href="#" onClick={() => {setAfraidPressed('');setForgetPressed('none')}}>害怕想起來</a>？
                    </span>
                </div>
                <div className="text-center p-t-12">
                <span class="txt3" style={{display: forgetPressed}}>
                    Poor You.
                </span>
                </div>
                <div className="text-center p-t-12">
                    <span class="txt3" style={{display: afraidPressed}}>
                        啊你是在<a href='#' onClick={() => {setPoppingPressed(''); setAfraidPressed('none')}} style={{fontSize: '16pt'}}>怕屁</a>喔？
                    </span>
                </div>
                <div className="text-center p-t-12" style={{display: poppingPressed}}>
                    <span class="txt3">
                        啊你是在<a href='#' onClick={() => setPoppingDoublePressed('')} style={{fontSize: '16pt'}}>popping</a>喔？
                    </span>
                </div>
                <div class="popping-img">
                    <img src={poppingImg} alt="IMG" id="poppingImg" style={{display: poppingDoublePressed}} />
                </div>
                <div className="text-center p-t-20">
                    <a className="txt2" href="#">
                        Create your Account
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage