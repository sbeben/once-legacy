import './messenger.css';
import Topbar from "../../components/Topbar/Topbar";
import ChatList from "../../components/ChatList/ChatList";
import Rightbar from "../../components/Rightbar/Rightbar";
import Message from "../../components/Message/Message";
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Messenger() {

	const [conversations, setConversations] = useState([]);
	// const [contactData, setContactData] = useState(null);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	//const [isMessageAllowed, setIsMessageAllowed] = useState(true);
	const scrollRef = useRef();
	const {user} = useContext(AuthContext);

useEffect(() => {
	const getConversations = async () => {
		try{
			const res = await axios.get("/conversations/" + user._id);
			setConversations(res.data);
			console.log("conversations", conversations)
		} catch(err){
			console.log(err.message);
		}
	};
	getConversations();
}, [user._id]);

// useEffect(() => {
// 		const friendId = conversation.members.find( (m) => m!==currentUser._id);
// 		const getUser = async () => {
// 			try{
// 				const res = await axios("/users?userId=" + friendId);
// 				console.log(res.data);
// 				setUser(res.data);
// 			} catch(err) {
// 				console.log(err);
// 			}
// 		};
// 		getUser();
// 	}, [currentUser, conversation]);

useEffect(() => {
	const getMessages = async () => {
	  try {
	    const res = await axios.get("/messages/" + currentChat?._id);
	    setMessages(res.data);
	    console.log(messages);
	    //compareDates();
	  } catch (err) {
	    console.log(err);
	  }
	};
	getMessages();
}, [currentChat]);

const handleSubmit = async (e) => {
	e.preventDefault();
	const message = {
		sender: user._id,
		text: newMessage,
		conversationId: currentChat._id
	};
	try{
		const res = await axios.post("/messages", message);
		setMessages([...messages, res.data]);
		setNewMessage("");
		//setIsMessageAllowed(false);
	}catch(err){
		console.log(err.message);
	}
};

useEffect(() => {
	scrollRef.current?.scrollIntoView({behavior: "smooth"});
}, [messages])


// const compareDates = () => {
// 	console.log(messages);
// 	let lastMessage = messages?.at(-1)
// 	const result = (new Date() - new Date(lastMessage.updatedAt)) / 60000;
// 	console.log(result);
// 	if (result < 1440){setIsMessageAllowed(false)}else{setIsMessageAllowed(true)}
// }

	return(
		<div>
			<Topbar />
			<div className="messenger">
				<div className="chatListWrapper">
					<ul className="chatList">
					{
						conversations.map(c=>(
							<div onClick={()=>{setCurrentChat(c);}}>
							<ChatList conversation={c} currentUser={user} key={c.members[1]}/>
							</div>
						))
					}
					</ul>
				</div>
				<div className="messengerContainer">
					{
						currentChat ? 
						(<>
							<div className="chatBoxTop">
							{messages.map(m => (
								<div ref={scrollRef}>
									<Message message={m} own={m.sender === user._id} key={m._id}/>	
								</div>
							))}
							</div>
							<div className="chatBoxBottom">
								<textarea 
									className="messageTextInput" 
									placeholder="Write your message here"
									onChange={(e)=>setNewMessage(e.target.value)}
									value={newMessage}
								>
								</textarea>
								<button className="chatSubmitButton" onClick={()=>handleSubmit()}>Send</button>
							</div>
						</>) : 
						(<span className="noConversationText"> Who do you wanna talk to</span>)
					}	
			    </div>
				{/*<Rightbar />*/}
			</div>
		</div>
	)
};