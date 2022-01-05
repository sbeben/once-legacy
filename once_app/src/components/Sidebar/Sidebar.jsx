import './sidebar.css';
import Contacts from '../Contacts/Contacts';
import {Users} from '../../data';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RssFeed,
	Chat,
	Person,
	Settings,
	HelpOutline, 
} from '@material-ui/icons';

export default function Sidebar() {

	const user = useSelector(state => state.user);
	
	// const [friends, setFriends] = useState([]);

	// useEffect(() => {
	// 	setFriends([]);
	// 	const getFriends = async () => {
	// 		try{
	// 			const contactList = await axios.get("/users/friends/" + user._id);
	// 			setFriends(contactList.data);
	// 		}catch(err){
	// 			console.log(err);
	// 		}
				
	// 	};
	// 	getFriends();
	// }, [user._id]);

	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				
				 <ul className="sidebarList">
 					<Link to={`/profile/${user.username}`} >
					 	<li className="sidebarListItem">
					 		<Person className="sidebarIcon"/>
					 		<span className="sidebarItemText">Profile</span>
					 	</li>
					</Link>
					<Link to="/" >
					 	<li className="sidebarListItem">
					 		<RssFeed className="sidebarIcon"/>
					 		<span className="sidebarItemText">Feed</span>
					 	</li>
					</Link>
					<Link to="/messenger" >		
					 	<li className="sidebarListItem">
					 		<Chat className="sidebarIcon"/>
					 		<span className="sidebarItemText">Messenger</span>
					 	</li>
					</Link>
				 	<li className="sidebarListItem">
				 		<Settings className="sidebarIcon"/>
				 		<span className="sidebarItemText">Settings</span>
				 	</li>
				 	<li className="sidebarListItem">
				 		<HelpOutline className="sidebarIcon"/>
				 		<span className="sidebarItemText">About</span>
			 		</li>
				 </ul>
				 <hr className="sidebarHr"/>
				{/*
				<ul className="sidebarFriendList">
					{friends.map(f => (
						<Link to={`/profile/${f.username}`}>
							<Contacts key={f._id} user={f}/>
						</Link>
					))} 	
				</ul>*/}
{/*
				original sidebar friendlist
				 <ul className="sidebarFriendList">
				 	<li className="sidebarFriend">
				 		<img className="sidebarFriendImg" src="/assets/ded.jpg" alt=""/>
				 		<span className="sidebarFriendName">Beebo Bobo</span>
				 	</li>
				 </ul>	*/}
			</div>
		</div>
	)
}

