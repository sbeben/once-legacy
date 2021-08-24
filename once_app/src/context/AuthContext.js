import { createContext ,useReducer } from 'react';
import AuthReducer from './AuthReducer'
const INITIAL_STATE ={
	user: { 
		_id: "60f9e6548d1b0f07b0eba3b0",
		profilePicture : "3.jpg",
		followers:[],
		follows:[],
		isAdmin:false,
		username:"test2",
		email:"test2@gmail.com",
		password:"$2b$10$gEaOg/kE/vzzoGuM67qgBelBJqRNXfvJ4cfksB1VplXEC9EbDfz4i"
	},
	isFetching: false,
	error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
	const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);
	return (
		<AuthContext.Provider value={{
			user: state.user,
			isFetching: state.isFetching,
			error: state.error,
			dispatch
		}}>	
		{children}	
		</AuthContext.Provider>
	)
};