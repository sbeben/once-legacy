import './settings.css';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
//import {useEffect, useState} from 'react';
//import axios from 'axios';
//import {useParams} from 'react-router-dom';


export default function Settings() {
	
	return (
		<div>
			<Topbar/>
			<div className="settings">
				<Sidebar/>
				<div className="settingsContainer">
					<div className="settingsSection">
						<h4 className="settingsHeader">User:</h4>
						<span className="settingsItemKey">Change username</span>
						<span className="settingsItemKey">Change password</span>
						<hr className="settingsHr"/>
						<h4 className="settingsHeader">Privacy (in progress):</h4>
						Who can see my
						<span className="settingsItemKey">contacts</span>
						<span className="settingsItemKey">posts</span>
						<span className="settingsItemKey">status</span>
						<span className="settingsItemKey">location</span>
						<span className="settingsItemKey">origin place</span>
						<hr className="settingsHr"/>
						<h4 className="settingsHeader">Report bug</h4>
					</div>
			    </div>
			    <Rightbar/>
		    </div>
		</div>
	)
}