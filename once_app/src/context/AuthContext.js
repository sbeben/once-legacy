import { createContext ,useReducer } from 'react';
import AuthReducer from './AuthReducer'
const INITIAL_STATE ={
	user: {"_id":"60f9e6548d1b0f07b0eba3b0","profilePicture":"6.jpg","coverPicture":"","followers":[],"follows":["60f9d1fdd207b12ac0092fed"],"isAdmin":false,"username":"test2","email":"test2@gmail.com","password":"$2b$10$gEaOg/kE/vzzoGuM67qgBelBJqRNXfvJ4cfksB1VplXEC9EbDfz4i","createdAt":{"$date":{"$numberLong":"1626990164181"}},"updatedAt":{"$date":{"$numberLong":"1629847842385"}},"__v":{"$numberInt":"0"}},
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