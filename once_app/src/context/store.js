import { createStore } from "redux";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
	user: JSON.parse(localStorage.getItem("user")) || null,
	isFetching: false,
	error: false
};

export const saveState = (state) => {
	try{
		const serializedState = JSON.stringify(state.user);
		localStorage.setItem("user", serializedState);
	} catch(err) {
		console.log(err);
	}
};

export const store = createStore(AuthReducer, INITIAL_STATE);


// export const loadState = () => {
// 	try{
// 		const serializedState = localStorage.getItem("user");
// 		if (serializedState === null){
// 			return null;
// 		}
// 		return JSON.parse(serializedState);
// 	} catch(err) {
// 		console.log(err);
// 		return null;
// 	}
// };
