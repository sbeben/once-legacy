import './share.css';
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons';
import { useRef, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user} = useContext(AuthContext);
	const desc = useRef();
	const [file, setFile] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value
		};
		if(file){
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName;
			try{
				await axios.post("/upload", data);
			}catch(err){
				console.log(err);
			}
		};
		try{
			await axios.post("/posts", newPost);
			window.location.reload();
		}catch(err){
			console.log(err);
		};
	};

	return (		
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img className="shareProfileImg" src={user.profilePicture && user.profilePicture.length > 5 ? user.profilePicture : PF+"8.jpg"} alt=""/>
					<input 
						className="shareInput" 
						placeholder={"Share your thoughts carefully, " + user.username} 
						ref={desc}
					/>
				</div>
				<hr className="shareHr"/>
				{file && (
					<div className="shareImageContainer">
						<img src={URL.createObjectURL(file)} alt="" className="shareImg"/>
						<Cancel className="shareCancelImg" onClick={() => {setFile(null)}}/>
					</div>
				)}
				<form className="shareBottom" onSubmit={handleSubmit}>
					<div className="shareOptions">	
						<label htmlFor="file" className="shareOption">
							<PermMedia className="shareIcon"/>
							<span className="shareOptionText">Picture</span>
							<input 
								type="file"
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e)=>setFile(e.target.files[0])}
								style={{display:"none"}}
							/>
							<span className="uploadInfo">(up to 2mb)</span>	
						</label>
					{/*	<div className="shareOption">
							<Room className="shareIcon"/>
							<span className="shareOptionText">Place</span>
						</div>*/}
					</div>
					<button className="shareButton" type="submit">Share</button>	
				</form>
			</div>
		</div>
	)
}

