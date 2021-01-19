import React from "react";
import avocado_pic from "../../../components/Images/avocado.png";

import "./profile.css"

export default function Profile(){
    return(
        <div className="container">
			<div className="row">
				<div className="col-md-12 col-sm-12">
					<img src={avocado_pic} className="img-responsive img-circle tm-border" alt="templatemo easy profile" />
					<h1 className="tm-title bold shadow">Allen</h1>
					<h1 className="white bold shadow">Creative Golem</h1>
				</div>
			</div>
		</div>
    );
}