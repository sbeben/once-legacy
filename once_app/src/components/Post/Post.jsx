import './post.css';
import {MoreVert} from "@material-ui/icons";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const {user:currentUser} = useContext(AuthContext)

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

		}
		setLike(isLiked ? like-1 : like+1);
		setIsLiked(!isLiked)
	}

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
						<MoreVert/>
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={PF+post.img} alt=""/>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<FavoriteBorderIcon className="FavoriteBorderIcon" onClick={likeHandler}/>
						<span className="likeCounter">{like}</span>						
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	)
}