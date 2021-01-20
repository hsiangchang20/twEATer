import React, {useState, useEffect} from "react";
import { NavLink, Switch, Route, Redirect, useLocation } from "react-router-dom";
//import ScriptTag from 'react-script-tag'
import './mainpage.css'
import logo from "../../components/Images/logo-reverse.png"
import logoTitle from "../../components/Images/tweater-reverse.png"
import Posts from "./Posts/Posts";
import Searches from "./Searches/Searches";
import PostsRender from "./Posts/PostsRender";
import Restaurant from "./Restaurants/Restaurant";
import Roulette from "./Roulette/Roulette";
import LoginPage from "./Login/loginPage";
import Profile from "./Profile/Profile";
import Add from "./Add/Add";
import Tweat from "./Tweat/Tweat";

export default function MainPage(props) {


    const [login, setLogin] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const [postStyle, setPostStyle] = useState({background: '#f4ff53'});
    const [searchStyle, setSearchStyle] = useState({});
    const [rouletteStyle, setRouletteStyle] = useState({});
    const [addStyle, setAddStyle] = useState({});
    const [profileStyle, setProfileStyle] = useState({});
    const [tweatStyle, setTweatStyle] = useState({});
    console.log(userdata._id);
    let dao = 0;

    const setMode = (mode, path) => {
        return path.includes(mode);
    }
    
    const location = useLocation();
    console.log(location.pathname);
    const path = location.pathname.toString();

    useEffect (() => {
        setMenuColorbyHeader(path)
    }, [path])
    
    const setMenuColorbyHeader = (path) => {
        setPostStyle({});
        setSearchStyle({});
        setRouletteStyle({});
        setAddStyle({});
        setProfileStyle({});
        setTweatStyle({});
        if (setMode("post", path) || setMode("restaurant", path)){
            {setPostStyle({background: '#f4ff53'})}
        }
        else if (setMode("search", path)){
            {setSearchStyle({background: '#f4ff53'})}
        }
        else if (setMode("roulette", path)){
            {setRouletteStyle({background: '#f4ff53'})}
        }
        else if (setMode("add", path)){
            {setAddStyle({background: '#f4ff53'})}
        }
        else if (setMode("profile", path)){
            {setProfileStyle({background: '#f4ff53'})}
        }
        else if (setMode("tweat", path)){
            {setTweatStyle({background: '#f4ff53'})}
        }
    }

    function setMenuColor(page) {
        setPostStyle({});
        setSearchStyle({});
        setRouletteStyle({});
        setAddStyle({});
        setProfileStyle({});
        if (page === 'post') {setPostStyle({background: '#f4ff53'})}
        else if (page === 'search') {setSearchStyle({background: '#f4ff53'})}
        else if (page === 'roulette') {setRouletteStyle({background: '#f4ff53'})}
        else if (page === 'add') {setAddStyle({background: '#f4ff53'})}
        else if (page === 'profile') {setProfileStyle({background: '#f4ff53'})}
    }

    return (
        <div>
            <title>Login V1</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="limiter">
                {login?
                    (<div>
                        <div id='menu-wrapper'>
                            <div id='menu'>
                                <ul>
                                    <li>
                                        <img src={logo} />
                                        <img src={logoTitle} />
                                    </li>
                                    <li className="main-button-li" style={postStyle}>
                                        <button className="main-button" /*onClick={()=>{setMenuColor("post")}}*/>
                                            <NavLink to={"/post/" + userdata._id} className="main-button-text">Post</NavLink>
                                        </button>
                                    </li>
                                    <li className="main-button-li" style={searchStyle}>
                                        <button className="main-button" /*onClick={()=>{setMenuColor("search")}}*/>
                                            <NavLink to={"/search/" + userdata._id} className="main-button-text">Search</NavLink>
                                        </button>
                                    </li>
                                    <li className="main-button-li" style={tweatStyle}>
                                        <button className="main-button" /*onClick={()=>{setMenuColor("profile")}}*/>
                                            <NavLink to={"/tweat/" + userdata._id} className="main-button-text">twEAT!!!</NavLink>
                                        </button>
                                    </li>
                                    <li className="main-button-li" style={rouletteStyle}>
                                        <button className="main-button" /*onClick={()=>{setMenuColor("roulette")}}*/>
                                            <NavLink to={"/roulette/" + userdata._id} className="main-button-text">Roulette</NavLink>
                                        </button>
                                    </li>
                                    <li className="main-button-li" style={addStyle}>
                                        <button className="main-button" /*onClick={()=>{setMenuColor("add")}}*/>
                                            <NavLink to={"/add/" + userdata._id} className="main-button-text">Add</NavLink>
                                        </button>
                                    </li>
                                    <li className="main-button-li" style={profileStyle}>
                                        <button className="main-button" /*onClick={()=>{setMenuColor("profile")}}*/>
                                            <NavLink to={"/profile/" + userdata._id} className="main-button-text">Profile</NavLink>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="container-background100">
                            <div id='wrapper'>
                                <Switch>
                                    <Route path="/post/:userid?" component={Posts} />
                                    <Route path="/postrender/:postid?/:userid?" component={PostsRender} />
                                    <Route path="/search/:userid?" component={Searches} />
                                    <Route path="/roulette/:userid?" component={Roulette} />
                                    <Route path="/restaurant/:name?/:userid?" component={Restaurant} />
                                    <Route path="/add/:userid?" component={Add} />
                                    <Route path="/profile/:id?/:userid?" component={Profile}/>
                                    <Route path="/tweat/:userid?" component={Tweat} />
                                    <Redirect from="/intermediate" to={"/post/" + userdata._id} />
                                    {login ? (<Redirect from="/" to={"/post/" + userdata._id} />) : (<></>)}
                                </Switch>
                            </div>
                        </div>
                    </div>) : (
                        <div className="container-background100-login">
                            <LoginPage onClick={(data) => {
                                if (data !== undefined) {
                                    if(data.login.name !== "allenwu0902"){
                                        console.log(data);
                                        setLogin(true);
                                        setUserdata(data.login)
                                    }
                                    else {
                                        dao++;
                                        if(dao%2==0)
                                            alert("Fuck 吳瑋倫");
                                    }
                                }
                                else console.log(data);
                            }} />
                        </div>
                    )
                }
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
