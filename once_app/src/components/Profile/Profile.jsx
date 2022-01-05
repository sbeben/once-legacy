import './profile.css';
import React, {Suspense} from 'react';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
//import Person from "../../components/Person/Person";
import Rightbar from "../../components/Rightbar/Rightbar";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
const Person = React.lazy(() => import("../../components/Person/Person"));

export default function Profile() {
	
	const username = useParams().username;	
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			console.log("fetched user in profile", res.data);
			setUser(res.data);
		};
		fetchUser();
	}, [username])

	return (
		<div>
			<Topbar/>
			<div className="profile">
				<Sidebar/>
				<div className="profileContainer">
					<Suspense fallback={<div>loading...</div>}>
						<Person user={user} key={user._id}/>
        			</Suspense>				
					<hr className="profileHr"/>
					<div className="profileBottom">
				    <Feed username={username}/>
				    </div>
			    </div>
			    <Rightbar/>
		    </div>
		</div>
	)
}