import './message.css';
import  {format}  from "timeago.js";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 

export default function Message({message, own}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [senderInfo, setSenderInfo] = useState({});
	const {user} = useContext(AuthContext);

	useEffect(()=>{
		const getUser = async () => {
			const res = await axios.get("/users?userId=" + message.sender);
			setSenderInfo(res.data); 
		}
		getUser();
	},[message]);

	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img className="messageImg" 
					src={own ? 
						(user.profilePicture && user.profilePicture.length > 5 ? user.profilePicture : PF+"8.jpg") 
						: (senderInfo.profilePicture && senderInfo.profilePicture.length > 5 ? senderInfo.profilePicture : PF+"8.jpg")
					} 
					alt=""
				/>
				<p className="messageText">{message.text}</p>
			</div>
			<div className="messageBottom">{format(message.createdAt)}</div>
		</div>
	)
}