import React, { useEffect, useState } from "react";
import avocado_pic from "../../../components/Images/avocado.png";
import allen_pic from "../../../components/Images/creative_allen.jpg";

import "./profile.css"
import {USER_QUERY} from '../../../graphql'
import { useQuery } from "@apollo/client";

export default function Profile(props){
	const { id } = props.match.params
    const { loading, error, data} = useQuery(USER_QUERY, {variables: {query: id}});
	const [name, setName] = useState('');

	const [editing, setEditing] = useState(false);

	useEffect(()=>{
		if (data !== undefined){
			setName(data.users[0].name);
		}
		console.log(data)
	})

    return (data === undefined || data.users === undefined) ? <></> : (
		<header>
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<img src={allen_pic} className="img-responsive img-circle tm-border" alt="templatemo easy profile" />
						<hr/>
						{editing ? (
							<div>
								<input className='tm-title bold shadow' 
                                    type="text" 
                                    placeholder="New name..." 
                            	/>
								<input className='white bold shadow' 
                                    type="text" 
                                    placeholder="New motto..." 
                            	/>
							</div>) : (
								<>
								<h1 className="tm-title bold shadow">
									{name}
								</h1>
								<h1 className="white bold shadow">
									Creative Golem
								</h1>
								</>
								)}
						<div className="edit">
							<button onClick={() => setEditing(!editing)}>
								<p>{editing ? "Confirm" : "Edit Profile"}</p>
							</button>
							
						</div>
					</div>
				</div>
			</div>
		</header>
                
    );
}