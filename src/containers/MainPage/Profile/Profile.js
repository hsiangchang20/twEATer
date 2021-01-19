import React, { useEffect, useState } from "react";
import avocado_pic from "../../../components/Images/avocado.png";

import "./profile.css"
import {USER_QUERY} from '../../../graphql'
import { useQuery } from "@apollo/client";

export default function Profile(props){
	const { id } = props.match.params
    const { loading, error, data} = useQuery(USER_QUERY, {variables: {query: id}});
	const [name, setName] = useState('')

	useEffect(()=>{
		setName(data.users[0].name);
	})

    return(
        <div className="container">
			<div className="row">
				<div className="col-md-12 col-sm-12">
					<img src={avocado_pic} className="img-responsive img-circle tm-border" alt="templatemo easy profile" />
					<h1 className="tm-title bold shadow">{name}</h1>
					<h1 className="white bold shadow">Creative Golem</h1>
				</div>
			</div>
		</div>        
    );
}