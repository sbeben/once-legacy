import { createStore } from "redux";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
	user: JSON.parse(localStorage.getItem("user")) || null,
	isFetching: false,
	error: false
};

export const store = createStore(AuthReducer, INITIAL_STATE);