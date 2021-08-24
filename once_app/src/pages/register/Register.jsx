import './register.css';
import { useRef, useContext} from 'react';
import { useHistory } from 'react-router';
import {regCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext";

export default function Register() {

	const email = useRef();
	const password = useRef();
	const username = useRef();
	const passwordRepeat = useRef();
	const {user, isFetching, error, dispatch} = useContext(AuthContext);
	const history = useHistory();

	const handleClick = (e) => {
		e.preventDefault();
		if(passwordRepeat.current.value !== password.current.value){
			passwordRepeat.current.setCustomValidity("Passwords don't match");
		} else {
			regCall({
				username: username.current.value,
				email: email.current.value,
				password: password.current.value
			}, dispatch);
			// history.push("/");
		}
	};
	console.log(user);

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Once</h3>
					<span className="loginDesc">Healthy communication</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input placeholder="Username" required ref={username} className="loginInput" />
						<input placeholder="Email" required ref={email} className="loginInput" type="email"/>
						<input placeholder="Password" required ref={password} className="loginInput" type="password"/>
						<input placeholder="Repeat password" required ref={passwordRepeat} className="loginInput" type="password"/>
						<button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? "loading" : "Sign Up"}</button>
						<button className="loginRegisterButton">Log in</button>
					</form>
				</div>
			</div>
			
		</div>
	)
}