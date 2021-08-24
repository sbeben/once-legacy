import "./topbar.css";
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user} = useContext(AuthContext);

	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/" style={{textDecoration: "none"}}>
				<span className="logo">Once</span>
				</Link>
			</div>	
			<div className="topbarCenter">
				<div className="searchBar">
					<Search className="searchIcon"/>
					<input placeholder ="Search" className="searchInput"></input>
				</div>
			</div>	
			<div className="topbarRight">
				<div className="topbarLinks">
					<span className="topbarLink">Homepage</span>
					<span className="topbarLink">Timeline</span>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<Person/>
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Chat/>
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Notifications/>
						<span className="topbarIconBadge">1</span>
					</div>
				</div>
				<Link to={`/profile/${user.username}`}>
				<img src={`${user.profilePicture ? PF + user.profilePicture : PF + "8.jpg"}`} alt="" className="topbarImg"/>
				</Link>
			</div>
		</div>
	)
};