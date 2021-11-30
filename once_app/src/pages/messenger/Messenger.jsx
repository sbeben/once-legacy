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
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const scrollRef = useRef();
	const {user} = useContext(AuthContext);

	console.log(conversations);

useEffect(() => {
	const getConversations = async () => {
		try{
			const res = await axios.get("/conversations/" + user._id);
			setConversations(res.data);
		} catch(err){
			console.log(err.message);
		}
	};
	getConversations();
}, [user._id]);

useEffect(() => {
	const getMessages = async () => {
	  try {
	    const res = await axios.get("/messages/" + currentChat?._id);
	    setMessages(res.data);
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
	}catch(err){
		console.log(err.message);
	}
};

useEffect(() => {
	scrollRef.current?.scrollIntoView({behavior: "smooth"});
}, [messages])

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
								<button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
							</div>
						</>) : 
						(<span className="noConversationText"> Who do you wanna talk to</span>)
					}	
			    </div>
				<Rightbar />
			</div>
		</div>
	)
};