import './rightbar.css'

export default function Rightbar() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				<img src={`${PF}back.jpg`} alt="" className="rightbarAd"/>
			</div>
		</div>
	)
}
