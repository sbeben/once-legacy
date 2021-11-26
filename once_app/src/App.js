import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./components/Profile/Profile";
import Messenger from "./pages/messenger/Messenger";


function App() {

  const {user} = useContext(AuthContext);

  return (
    <div>
    <Router>
    <Messenger />
    </Router>
   {/* <Router>
          <Switch>
            <Route exact path="/">
              {user ? <Home/> : <Login/>}
            </Route>
            <Route exact path="/login">
              {user ? <Redirect to="/"/> : <Login/>}
            </Route>
            <Route exact path="/register">
              {user ? <Redirect to="/"/> : <Register/>}
            </Route>
            <Route exact path="/profile/:username">
              <Profile/>
            </Route>
          </Switch> 
        </Router>*/}
    </div> 
 );
}

export default App;
