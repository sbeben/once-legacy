import './searchresult.css';

export default function SearchResult ({profilePicture, username}) {

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return(
		<div className="searchItem">
			<img className="searchItemImg" src={profilePicture || PF + "8.jpg"} alt=""/>
			<span className="searchItemName">{username}</span>
		</div>
			
	)
}