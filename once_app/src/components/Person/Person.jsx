import './person.css';


export default function Person({user}) {

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return(
		<div className="profileTop">
			<div className="profileInfo">
				<img className="profileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"8.jpg"} alt=""/>
				<div className="profileInfoText">
					<h4 className="profileInfoName">{user.username}</h4>
					<span className="profileInfoDesc">{user.desc}</span>
					<div className="profileInfoItems">
						<div className="profileInfoItem">
							<span className="profileInfoKey">City: </span>
							<span className="profileInfoValue">{user.city}</span>
						</div>
						<div className="profileInfoItem">
							<span className="profileInfoKey">From: </span>
							<span className="profileInfoValue">{user.from}</span>
						</div>
						<div className="profileInfoItem">
							<span className="profileInfoKey">Status: </span>
							<span className="profileInfoValue">{user.status === 1 ? "Active" : user.status === 2 ? "Inactive" : "Reasoning"}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};