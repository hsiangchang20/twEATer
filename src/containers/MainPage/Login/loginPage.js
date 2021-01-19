import React, {useState, useEffect} from "react";
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

import fruits from "../fruits/fruits"

function LoginPage(props) {
    const [forgetPasswordPressed, setForgetPasswordPressed] = useState('none');
    const [forgetPressed, setForgetPressed] = useState('none');
    const [afraidPressed, setAfraidPressed] = useState('none')
    const [poppingPressed, setPoppingPressed] = useState('none');
    const [poppingDoublePressed, setPoppingDoublePressed] = useState('none');
    const [email, setEmail] = useState('');
    const [password, setPW] = useState('');
    const [Login, {loading, data}] = useLazyQuery(LOGIN_QUERY);
    const [create, setCreate] = useState(false);
    const [username, setUsername] = useState('');
    const [emailname, setEmailname] = useState('');
    const [passwordname, setPasswordname] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [border1, setBorder1] = useState('');
    const [border2, setBorder2] = useState('');
    const [border3, setBorder3] = useState('');
    const [border4, setBorder4] = useState('');
    const [border5, setBorder5] = useState('');
    const [border6, setBorder6] = useState('');
    const [border7, setBorder7] = useState('');
    const [border8, setBorder8] = useState('');
    const [border9, setBorder9] = useState('');
    const [border10, setBorder10] = useState('');
    const [fruit, setFruit] = useState(0);

    const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits

    function setBorder(num) {
        setBorder1("");
        setBorder2("");
        setBorder3("");
        setBorder4("");
        setBorder5("");
        setBorder6("");
        setBorder7("");
        setBorder8("");
        setBorder9("");
        setBorder10("");
        if (num===1){setBorder1("solid 1px #333333")}
        else if (num===2){setBorder2("solid 1px #333333")}
        else if (num===3){setBorder3("solid 1px #333333")}
        else if (num===4){setBorder4("solid 1px #333333")}
        else if (num===5){setBorder5("solid 1px #333333")}
        else if (num===6){setBorder6("solid 1px #333333")}
        else if (num===7){setBorder7("solid 1px #333333")}
        else if (num===8){setBorder8("solid 1px #333333")}
        else if (num===9){setBorder9("solid 1px #333333")}
        else if (num===10){setBorder10("solid 1px #333333")}
    }

    useEffect( ()=> {
        console.log(data);
        props.onClick(data);
    }, [data])

    useEffect( ()=> {
        console.log(email, password);
    }, [email, password])

    const createUser = () => {
        if (!username || !emailname) {
            alert("Please fill in all the required information!")
        }

        if (!emailname.includes('@')) {
            alert("Your email is invalid!")
        }

        else if (passwordname !== confirmPw) {
            alert("Password and Confirmed Password is incosistent!")
        }
        
        else if (passwordname.length < 8) {
            alert("The password should have at least 8 characters!")
        }

        else if (!fruit) {
            alert("Please select a fruit as your twEATer icon")
        }
        else {
            setCreate(false)
        }
        
        console.log(username)
        console.log(emailname)
        console.log(passwordname)
        //console.log(confirmPw)
        console.log(fruit)
    }
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
            {!create?
            (
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

                    <div className="wrap-input100 validate-input" dataValidation = "Password is required">
                        <input  className="input100" 
                                type="password" 
                                name="pass" 
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>{setPW(e.target.value)}}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    
                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn" onClick={(e)=>{
                            e.preventDefault();
                            Login({ variables: { email: email, password: password } });
                        }}>
                            <NavLink to="/intermediate" style={{fontFamily: 'Montserrat-Bold', color: "white", fontSize: "12pt"}}>Login</NavLink>
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
                        <span className="txt2" style={{display: forgetPasswordPressed,}} id="forget">
                            你是<a href="#" onClick={() => {setForgetPressed(''); setAfraidPressed('none'); setPoppingPressed('none'); setPoppingDoublePressed('none')}}>忘記</a>了，還是<a href="#" onClick={() => {setAfraidPressed('');setForgetPressed('none')}}>害怕想起來</a>？
                        </span>
                    </div>
                    <div className="text-center p-t-12">
                    <span className="txt3" style={{display: forgetPressed}}>
                        Poor You.
                    </span>
                    </div>
                    <div className="text-center p-t-12">
                        <span className="txt3" style={{display: afraidPressed}}>
                            啊你是在<a href='#' onClick={() => {setPoppingPressed(''); setAfraidPressed('none')}} style={{fontSize: '16pt'}}>怕屁</a>喔？
                        </span>
                    </div>
                    <div className="text-center p-t-12" style={{display: poppingPressed}}>
                        <span className="txt3">
                            啊你是在<a href='#' onClick={() => setPoppingDoublePressed('')} style={{fontSize: '16pt'}}>popping</a>喔？
                        </span>
                    </div>
                    <div className="popping-img">
                        <img src={poppingImg} alt="IMG" id="poppingImg" style={{display: poppingDoublePressed}} />
                    </div>
                    <div className="text-center p-t-20">
                        <button onClick={() => {setCreate(true)}}>
                            <a to="/create" href="#" className="txt2">Create your Account{"  "}<i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                        </button>
                    </div>
                </form>
            ) : (
                <form className="login100-form">
                    <div className="login100-form-title">
                        Create Account
                    </div>
                    <div className="wrap-input100">
                        <input  className="input100"
                                placeholder="Username"
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="wrap-input100" dataValidate = "Valid email is required: ex@abc.xyz">
                        <input  className="input100"
                                placeholder="Email"
                                value={emailname}
                                onChange={(e)=>{setEmailname(e.target.value)}}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input" dataValidation = "Password is required">
                        <input  className="input100" 
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {setPasswordname(e.target.value)}}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input" dataValidation = "Password is required">
                        <input  className="input100" 
                                type="password"
                                placeholder="Confirmed Password"
                                onChange={(e) => {setConfirmPw(e.target.value)}}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="txt1 choose-fruit">
                        <span style={{color: "black"}}>Choose Your Favorite Fruit: </span><br/>
                        <button className="button-fruit" style={{border: border1}} onClick={() => {
                            setBorder(1)
                            setFruit(1)
                        }}><img src={watermelon}/></button>
                        <button className="button-fruit" style={{border: border2}} onClick={() => {
                            setBorder(2)
                            setFruit(2)
                        }}><img src={cherry}/></button>
                        <button className="button-fruit" style={{border: border3}} onClick={() => {
                            setBorder(3)
                            setFruit(3)
                        }}><img src={strawberry}/></button>
                        <button className="button-fruit" style={{border: border4}} onClick={() => {
                            setBorder(4)
                            setFruit(4)
                        }}><img src={apple}/></button>
                        <button className="button-fruit" style={{border: border5}} onClick={() => {
                            setBorder(5)
                            setFruit(5)
                        }}><img src={lemon}/></button>
                        <button className="button-fruit" style={{border: border6}} onClick={() => {
                            setBorder(6)
                            setFruit(6)
                        }}><img src={peach}/></button>
                        <button className="button-fruit" style={{border: border7}} onClick={() => {
                            setBorder(7)
                            setFruit(7)
                        }}><img src={kiwi}/></button>
                        <button className="button-fruit" style={{border: border8}} onClick={() => {
                            setBorder(8)
                            setFruit(8)
                        }}><img src={orange}/></button>
                        <button className="button-fruit" style={{border: border9}} onClick={() => {
                            setBorder(9)
                            setFruit(9)
                        }}><img src={pineapple}/></button>
                        <button className="button-fruit" style={{border: border10}} onClick={() => {
                            setBorder(10)
                            setFruit(10)
                        }}><img src={avocado}/></button>
                    </div>
                    <button className="login100-form-btn" onClick={createUser}>
                        Create
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginPage