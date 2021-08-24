import './rightbar.css'
import CakeIcon from '@material-ui/icons/Cake';

export default function Rightbar() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				<div className="birthdayContainer">
					<CakeIcon className="birthdayImg"/>
					<span className="birthdayText">Beebo and 3 other friends have a birthday today
					</span>
				</div>
				<img src={`${PF}back.jpg`} alt="" className="rightbarAd"/>
			</div>
		</div>
	)
}
