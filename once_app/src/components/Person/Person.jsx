import './person.css';
import Contacts from '../Contacts/Contacts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux'; 
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function Person({user}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [contacts, setContacts] = useState([]);	
	const currentUser = useSelector(state => state.user);
	const [permission, setPermission] = useState(user.username === currentUser?.username || user.isAdmin === true);
	const [followed, setFollowed] = useState(currentUser?.follows.includes(user?._id));
	const [isEditing, setIsEditing] = useState(false);
	const [editedInfo, setEditedInfo] = useState({});
	const dispatch = useDispatch();

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
		setFollowed(currentUser?.follows.includes(user?._id));
	}, [user._id, currentUser?.follows]);

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
	const editStatus = (e) => {
		setEditedInfo({ ...editedInfo, status: e.target.value})
	}

	const updateInfo = async () => {
		try {
			const res = await axios.put("/users/" + user._id, editedInfo);
			dispatch({type: "LOGIN_SUCCESS", payload: res.data});
			window.location.reload();
		} catch(err) {
			console.log(err);
		}
	};

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
						{isEditing ? 
							<div className="editing"><CheckIcon className="editIcons" onClick={() => updateInfo()}></CheckIcon>
							<ClearIcon className="editIcons" onClick={()=>setIsEditing(!isEditing)}></ClearIcon></div>
							:
							permission === true  && (
								<EditIcon className="editIcons" onClick={() => setIsEditing(!isEditing)} ></EditIcon>
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
						{user.username !== currentUser?.username && (
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
							<label for="status" className="profileInfoKey">Status: </label>
							{!isEditing ?
							<span className="profileInfoValue">{user.status === 1 ? "Active" : user.status === 2 ? "Inactive" : "Reasoning"}</span>
							:
							<select name="status" value={editedInfo.status} onChange={(e) => editStatus(e)}>
							  <option value="1">Active</option>
							  <option value="2">Inactive</option>
							  <option value="3">Reasoning</option>
							</select>
							}
						</div>
						{!permission === true &&
						<div className="profileInfoItem">
							<span className="profileInfoKey">Contacts: </span>
							<span className="profileInfoValue">
							{contacts.map(friend => (
								<Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
								<Contacts key={friend._id} user={friend}/>
							</Link>
							))}
							</span>
						</div>}
					</div>
				</div>
			</div>
		</div>
	)
};