import './post.css';
import {MoreVert} from "@material-ui/icons";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currentUser} = useContext(AuthContext);
	
	const editedPost = useRef();
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const [options, setOptions] = useState(false);
	const [removing,setRemoving] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data)
		};
		fetchUser();
	}, [post.userId]);

	useEffect(()=>{
		setIsLiked(post.likes.includes(currentUser._id))
	},[currentUser._id,post.likes])

	const likeHandler = () => {
		try{
			axios.put("/posts/"+post._id+"/like", {userId:currentUser._id})
		} catch(err) {
			console.log(err);
		}
		setLike(isLiked ? like-1 : like+1);
		setIsLiked(!isLiked)
	};

	const handleDelete = async () => {
		try{
			const deletePost = await axios.delete("/posts/" + post._id, {data: {userId:currentUser._id} })
			window.location.reload();
		} catch(err){
			console.log(err);
		}
	};

	const handleEdit = async (e) => {
		try{
			const editPost = await axios.put("/posts/" + post._id, { userId:currentUser._id, desc:editedPost.current.value })
			window.location.reload();
		} catch(err){
			console.log(err);
		}
	};

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
						<img className="postProfileImg" src={user.profilePicture && user.profilePicture.length > 5 ? user.profilePicture : PF+"8.jpg"} alt=""/>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						{options && 
							(<>{isEditing ? 
									<><span className="saveDelete">save?</span><CheckIcon onClick={()=>handleEdit()}/><ClearIcon onClick={()=>setIsEditing(!isEditing)}/></>
									:
									<EditIcon className="editDeleteIcons" onClick={()=>setIsEditing(!isEditing)}/>}
								{!removing ? 
									<BlockIcon className="editDeleteIcons" onClick={() => setRemoving(!removing)}/> 
									: 
									<><span className="saveDelete">delete?</span><CheckIcon onClick={()=>handleDelete()}/><ClearIcon onClick={()=>setRemoving(!removing)}/></>}
							</>)}
						{(user.username === currentUser.username || user.isAdmin === true) && (<MoreVert onClick={() => setOptions(!options)}/>)}
					</div>
				</div>
				<div className="postCenter">
					{
						!isEditing ?	
						<><span className="postText">{post?.desc}</span>
						<img className="postImg" src={PF+post.img} alt=""/></>
						:
						<><input type="text" className="editPostText" defaultValue={post.desc} ref={editedPost}/>
						<img className="postImg" src={PF+post.img} alt=""/></>	
					}
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<FavoriteBorderIcon className="FavoriteBorderIcon" onClick={likeHandler}/>
						<span className="likeCounter">{like}</span>						
					</div>
					{/*<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>*/}
				</div>
			</div>
		</div>
	)
}