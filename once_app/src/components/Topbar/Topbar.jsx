import "./topbar.css";
import SearchResult from '../SearchResult/SearchResult'
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import {Link} from 'react-router-dom';
import {logoutCall} from "../../apiCalls"
import { useRef, useContext, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

//import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Topbar() {
	const searchQuery  = useRef();
	const searchContainerRef = useRef();
	const [searchResult, setSearchResult] = useState([]);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	//const {user, dispatch} = useContext(AuthContext);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const handleSearch = async (e) => {
		e.preventDefault();
		try{
		const res = await axios.get(`/search?username=${searchQuery.current.value}`)
		setSearchResult(res.data);
		}
		catch(err){
		console.log(err.message);	
		}
	};
	
	useEffect(() => {
	    const checkIfClickedOutside = e => {
	      if (searchResult.length !== 0 && searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
	        setSearchResult([])
	      }
	    }
	    document.addEventListener("mousedown", checkIfClickedOutside)
	    return () => {
	      document.removeEventListener("mousedown", checkIfClickedOutside)
	    }
	  }, [searchResult, searchContainerRef])

	const handleLogout = (e) => {
		e.preventDefault();
		logoutCall(dispatch);
	};

	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/">
				<span className="logo">Once</span>
				</Link>
			</div>	
			<div className="topbarCenter">
				<div className="searchBar">
					<Search className="searchIcon"/>
					<form onSubmit={handleSearch}>
						<input type="text" placeholder ="Search" className="searchInput" ref={searchQuery}></input>
						<input type="submit" style={{display: "none"}}/>
					</form>
				</div>
				{searchResult.length !== 0 &&	 
					<div className="searchResultsContainer" ref={searchContainerRef}>
						{searchResult.map(item => (
							<Link to={`/profile/${item.username}`} onClick={() => setSearchResult([])}><SearchResult profilePicture={item.profilePicture} username={item.username} key={item._id}/></Link>
						))}
					</div>
				}
			</div>	
			<div className="topbarRight">
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
				<div className="topbarLogoutProfile"> 
					<Link to="/login" style={{textDecoration: "none"}}>
						<span className="topbarLink" onClick={handleLogout}>Logout</span>
					</Link>
					<Link to={`/profile/${user.username}`}>
						<img src={user.profilePicture && user.profilePicture.length > 5 ? user.profilePicture : PF + "8.jpg"} alt="" className="topbarImg"/>
					</Link>
				</div>
			</div>
		</div>

	)
};