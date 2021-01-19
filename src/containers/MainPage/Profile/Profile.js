import React, { useEffect } from "react";
import avocado_pic from "../../../components/Images/avocado.png";

import "./profile.css"

export default function Profile(props){
	const { id } = props.match.params

	useEffect(()=>{
		console.log(props.match.params);
	})

    return(
        <div className="container">
			<div className="row">
				<div className="col-md-12 col-sm-12">
					<img src={avocado_pic} className="img-responsive img-circle tm-border" alt="templatemo easy profile" />
					<h1 className="tm-title bold shadow">{id}</h1>
					<h1 className="white bold shadow">Creative Golem</h1>
				</div>
			</div>
		</div>        
    );
}