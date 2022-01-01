import './person.css';
import Contacts from '../Contacts/Contacts';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { AuthContext, dispatch } from '../../context/AuthContext';
import EditIcon from '@material-ui/icons/Edit';

export default function Person({user}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [contacts, setContacts] = useState([]);
	const {user:currentUser, dispatch} = useContext(AuthContext);
	const [followed, setFollowed] = useState(currentUser.follows.includes(user?._id));
	const [isEditing, setIsEditing] = useState(false);
	const [editedInfo, setEditedInfo] = useState({});

	console.log(editedInfo);

	useEffect(() => {
   		setEditedInfo({userId:user._id, desc: user.desc, city: user.city, from: user.from, status: user.status})
	}, [user]);

	useEffect(() => {
		setContacts([]);
		const getContacts = async () => {
			try{
				const contactList = await axios.get("/users/friends/" + user._id);
				setContacts(contactList.data);
			}catch(err){
				console.log(err);
			}
				
		};
		getContacts();
		setFollowed(currentUser.follows.includes(user?._id));
	}, [user._id, currentUser.follows]);

	const editDesc = (e) => {
		setEditedInfo({ ...editedInfo, desc: e.target.value})
	}
	const editCity = (e) => {
		setEditedInfo({ ...editedInfo, city: e.target.value})
	}
	const editFrom = (e) => {
		setEditedInfo({ ...editedInfo, from: e.target.value})
	}
	const editProfilePic = (e) => {
		setEditedInfo({ ...editedInfo, profilePicture: e.target.value})
	}


	// const editStatus = (e) => {
	// 	setEditedInfo({ ...editedInfo, city: e.target.value})
	// }

	const updateInfo = async () => {
		try {
			const res = await axios.put("/users/" + user._id, editedInfo);
			dispatch({type: "LOGIN_SUCCESS", payload: res.data});
			console.log(res.data);
			window.location.reload();
		} catch(err) {
			console.log(err);
		}
	}

	const handleFollow = async () => {
		try {
			if(followed){
				await axios.put("/users/" + user._id + "/unfollow", {userId: currentUser._id});
				dispatch({type: "UNFOLLOW", payload: user._id});
			} else {
				await axios.put("/users/" + user._id + "/follow", {userId: currentUser._id});
				dispatch({type: "FOLLOW", payload: user._id});
				createConversation({user, currentUser})
			}
		}catch(err){
			console.log(err)
		}
		setFollowed(!followed);
	};

	const createConversation = async ({user, currentUser}) => {
		try {
			await axios.post("/conversations/", {senderId: currentUser._id, receiverId: user._id});
		} catch(err) {
			console.log(err);
		}
	};

	return(
		<div className="profileTop">
			<div className="profileInfo">
				<img className="profileImg" src={user.profilePicture && user.profilePicture.length > 5 ? user.profilePicture : PF+"8.jpg"} alt=""/>
				<div className="profileInfoText">
					<div className="nameAndEdit">
						<h4 className="profileInfoName">{user.username}</h4>
						{isEditing && <button className="editButton" onClick={() => updateInfo()}>append</button>}
						{(user.username === currentUser.username || user.isAdmin === true)  && (
								<EditIcon className="editIcon" onClick={() => setIsEditing(!isEditing)} ></EditIcon>
						)}
					</div>
					{!isEditing ?
					<span className="profileInfoDesc">{user.desc}</span>
					:
					<input type="text" className="editDesc" value={editedInfo.desc} maxLength="80" onChange={(e) => editDesc(e)}/>
					}
					{isEditing &&
					<input type="text" className="editPic" placeholder="profile picture link" maxLength="300" onChange={(e) => editProfilePic(e)}/>	
					}
					<div className="profileInfoItems">
						{user.username !== currentUser.username && (
							<button onClick={handleFollow} className="addContactButton">{followed ? "Unfollow" : "Follow"}</button>
						)}
						<div className="profileInfoItem">
							<span className="profileInfoKey">City: </span>
							{!isEditing ?
							<span className="profileInfoValue">{user.city}</span>
							:
							<input type="text" className="profileInfoValue" value={editedInfo.city} maxLength="30" onChange={(e) => editCity(e)}/>
							}
						</div>
						<div className="profileInfoItem">
							<span className="profileInfoKey">From: </span>
							{!isEditing ?
							<span className="profileInfoValue">{user.from}</span>
							:
							<input type="text" className="profileInfoValue" value={editedInfo.from} maxLength="30" onChange={(e) => editFrom(e)}/>
							}
						</div>
						<div className="profileInfoItem">
							<span className="profileInfoKey">Status: </span>
							<span className="profileInfoValue">{user.status === 1 ? "Active" : user.status === 2 ? "Inactive" : "Reasoning"}</span>
						</div>
						<div className="profileInfoItem">
							<span className="profileInfoKey">Contacts: </span>
							<span className="profileInfoValue">
							{contacts.map(friend => (
								<Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
								<Contacts key={friend._id} user={friend}/>
							</Link>
							))}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};