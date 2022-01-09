import './about.css';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";

export default function About() {
	
	return (
		<div>
			<Topbar/>
			<div className="about">
				<Sidebar/>
				<div className="aboutContainer">
					<p class="aboutText">
						<span className="aboutLogo">Once</span> is an art project made by S. Merlin based on idea of R.Smirnov.<br/>
						It is a social media and messenger with clear limits:<br/>
						- you can send only one message a day to a single person<br/>
						- you can post only in your profile and only once a weak<br/>
						- you can see posts only of your friends (if you want to) and<br/>
						without any ranking algorithms<br/> 
						The project is aimed on pointing on issues we face being involved in<br/>
						modern post-internet way of communication, such as:<br/>
						- anxiety and lack of concentration caused by <br/> 
						endless flow of information <br/> 
						- constant need for "something new" in your device which is<br/>
						a bad habit and losing time<br/>
						- "quality" of thoughts is replaced by quantity<br/>
						- limiteless ability to upload information into the web leads to<br/>
						increasing of CO<sub>2</sub> emission 
					</p>
			    </div>
			    <Rightbar/>
		    </div>
		</div>
	)
}