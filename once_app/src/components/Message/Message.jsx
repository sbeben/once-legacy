import './message.css';
import  {format}  from "timeago.js"; 

export default function Message({message, own}) {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img className="messageImg" src="https://www.dubstudio.co.uk/images/stories/artists/kahn/kahn_profile.jpg" alt=""/>
				<p className="messageText">{message.text}</p>
			</div>
			<div className="messageBottom">{format(message.createdAt)}</div>
		</div>
	)
}