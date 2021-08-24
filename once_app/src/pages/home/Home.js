import './home.css'
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";


export default function Home() {
	return (
		<div>
			<Topbar/>
			<div className="homeContainer">
				<Sidebar/>
			    <Feed/>
			    <Rightbar/>
		    </div>
	    </div>
	)
};