import './chatlist.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatList({conversation, currentUser}) {

	const [user, setUser] = useState(null);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const friendId = conversation.members.find( (m) => m!==currentUser._id);
		const getUser = async () => {
			try{
				const res = await axios("/users?userId=" + friendId);
				console.log(res.data);
				setUser(res.data);
			} catch(err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);

	return (
		<div className="chatList">
			<li className="chatListFriend">
				<img className="chatListFriendImg" src={user?.profilePicture ? PF + user.profilePicture : PF + "8.jpg"} alt=""/>
				<span className="chatListFriendName">{user?.username || "Some Friend" }</span>
			</li>	
		</div>
	)
}