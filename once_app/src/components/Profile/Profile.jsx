import './profile.css';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Person from "../../components/Person/Person";
import Rightbar from "../../components/Rightbar/Rightbar";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function Profile() {
		
	const [user, setUser] = useState({});
	const username = useParams().username;


	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data)
		};
		fetchUser();
	}, [username])

	return (
		<div>
			<Topbar/>
			<div className="profile">
				<Sidebar/>
				<div className="profileContainer">
					<Person user={user}/>
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