import React, { useEffect, useState } from "react";
import avocado_pic from "../../../components/Images/avocado.png";
import allen_pic from "../../../components/Images/creative_allen.jpg";

import "./profile.css"
import {USER_QUERY} from '../../../graphql'
import { useQuery } from "@apollo/client";

//for editing profile
import '../../MainPage/Login/css/main.css'
import '../../MainPage/Login/css/util.css'
import '../../MainPage/Login/vendor/bootstrap/css/bootstrap.min.css'
import '../../MainPage/Login/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../MainPage/Login/vendor/animate/animate.css'
import '../../MainPage/Login/vendor/css-hamburgers/hamburgers.min.css'
import '../../MainPage/Login/vendor/select2/select2.min.css'
import fruits from "../fruits/fruits"


export default function Profile(props){
	const { id } = props.match.params
    const { loading, error, data} = useQuery(USER_QUERY, {variables: {query: id}});
	const [name, setName] = useState('');

	const [editing, setEditing] = useState(false);

	//for editing profile:
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
	
	const mutateUser = () => {
		if (editing){
			if (!username || !emailname) {
				alert("Please fill in all the required information!")
			}
	
			else if (!emailname.includes('@')) {
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
				setEditing(false)
			}
			
			
			console.log(username)
			console.log(emailname)
			console.log(passwordname)
			//console.log(confirmPw)
			console.log(fruit)
		}
		else {
			setEditing(!editing)
		}
    }



	useEffect(()=>{
		if (data !== undefined){
			setName(data.users[0].name);
		}
		console.log(data)
	})
	/*
	const old_profile_edit = (
		<div>
			<h1 className='tm-title bold shadow edit-input' >
				New name&nbsp;:&nbsp;&nbsp;
				<input
					type="text" 
					placeholder="Allen" 
				/>
			</h1>
			<h1 className='white bold shadow edit-input' >
				New fruit&nbsp;&nbsp; : &nbsp;
				<input
					type="text" 
					placeholder="Is Handsome" 
				/>
			</h1>
		</div>
	)
	*/
	const profile_edit = (
		<form className="login100-form edit-form">
			<div className="login100-form-title">
				Edit Profile
			</div>
			<div className="wrap-input100">
				<input  className="input100"
						placeholder={"Username"}
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
			<div className="txt1 choose-fruit de-border">
				<span style={{color: "black"}}>Choose Your Favorite Fruit: </span><br/>
				<button type="button" className="button-fruit" style={{border: border1}} onClick={() => {
					setBorder(1)
					setFruit(1)
				}}><img src={watermelon}/></button>
				<button type="button" className="button-fruit" style={{border: border2}} onClick={() => {
					setBorder(2)
					setFruit(2)
				}}><img src={cherry}/></button>
				<button type="button" className="button-fruit" style={{border: border3}} onClick={() => {
					setBorder(3)
					setFruit(3)
				}}><img src={strawberry}/></button>
				<button type="button" className="button-fruit" style={{border: border4}} onClick={() => {
					setBorder(4)
					setFruit(4)
				}}><img src={apple}/></button>
				<button type="button" className="button-fruit" style={{border: border5}} onClick={() => {
					setBorder(5)
					setFruit(5)
				}}><img src={lemon}/></button>
				<button type="button" className="button-fruit" style={{border: border6}} onClick={() => {
					setBorder(6)
					setFruit(6)
				}}><img src={peach}/></button>
				<button type="button" className="button-fruit" style={{border: border7}} onClick={() => {
					setBorder(7)
					setFruit(7)
				}}><img src={kiwi}/></button>
				<button type="button" className="button-fruit" style={{border: border8}} onClick={() => {
					setBorder(8)
					setFruit(8)
				}}><img src={orange}/></button>
				<button type="button" className="button-fruit" style={{border: border9}} onClick={() => {
					setBorder(9)
					setFruit(9)
				}}><img src={pineapple}/></button>
				<button type="button" className="button-fruit" style={{border: border10}} onClick={() => {
					setBorder(10)
					setFruit(10)
				}}><img src={avocado}/></button>
			</div>
		</form>
	)

    const profile = (data === undefined || data.users === undefined) ? <></> : (
		<header>
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<img src={allen_pic} className="img-responsive img-circle tm-border" alt="templatemo easy profile" />
						<hr/>
						{editing ? <div className="edit-container">{profile_edit}</div> : (
								<>
								<h1 className="tm-title bold shadow">
									{name}
								</h1>
								<p>&nbsp;</p>
								</>
								)}
						<div className="edit">
							<button className="login100-form-btn" onClick={mutateUser}>
								{editing ? "Confirm" : "Edit Profile"}
							</button>
							
						</div>
					</div>
				</div>
			</div>
		</header>
	);
	
	return (
		<div className="wrap-profile">
			<div className="profile-container">
				{profile}
			</div>
			
		</div>
	)
}