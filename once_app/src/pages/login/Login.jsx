import './login.css';
import {Link} from 'react-router-dom';
import {useRef, useContext} from 'react';
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext";

export default function Login() {
	
	const email = useRef();
	const password = useRef();
	const {user, isFetching, error, dispatch} = useContext(AuthContext);

	const handleClick = (e) => {
		e.preventDefault();
		loginCall({email : email.current.value, password: password.current.value}, dispatch);
	};
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Once</h3>
					<span className="loginDesc">Healthy communication</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input required type="email" placeholder="Email" className="loginInput" ref={email}/>
						<input required type ="password" placeholder="Password" className="loginInput" ref={password}/>
						<button className="loginButton" type ="submit" disabled={isFetching}>{isFetching ? "loading" : "Log In"}</button>
						<span className="loginForgot">Forgot Password?</span>
						<button  className="loginRegisterButton">{<Link to="/register">Create account</Link>}</button>
						
					</form>
				</div>
			</div>
			
		</div>
	)
}