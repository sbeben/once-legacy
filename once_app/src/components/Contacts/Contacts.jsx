import './contacts.css'


export default function Contacts({user}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div>
			<li className="sidebarFriend">
				<img className="sidebarFriendImg" src={user.profilePicture && user.profilePicture.length > 5 ? user.profilePicture : PF + "8.jpg"} alt=""/>
				<span className="sidebarFriendName">{user.username}</span>
			</li>	
		</div>
	)
}