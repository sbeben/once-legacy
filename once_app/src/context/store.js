import { createStore } from "redux";
import AuthReducer from "./AuthReducer";

// const fetchUser = () => {
// 		try{
// 			JSON.parse(localStorage.getItem("user"))
// 		}catch(err){
// 			console.log(err);
// 			return null
// 		}};

const INITIAL_STATE ={
	user: JSON.parse(localStorage.getItem("user")) || null ,
	isFetching: false,
	error: false
};

export const store = createStore(AuthReducer, INITIAL_STATE);

// export const loadState = () => {
// 	try{
// 		const serializedState = localStorage.getItem("user");
// 		if (serializedState === null){
// 			return undefined;
// 		}
// 		return JSON.parse(serializedState);
// 	} catch(err) {
// 		console.log(err);
// 		return undefined;
// 	}
// };

export const saveState = (state) => {
	try{
		const serializedState = JSON.stringify(state.user);
		localStorage.setItem("user", serializedState);
	} catch(err) {
		console.log(err);
	}
};