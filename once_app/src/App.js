import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./components/Profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Settings from "./pages/settings/Settings";
import About from "./pages/about/About";


function App() {

  const user = useSelector(state => state.user);

  return (  
    <div>
        <Router>
         <Switch>
            <Route exact path="/messenger"> 
              {!user ? <Redirect to="/" /> : <Messenger />}
            </Route>
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
             {!user ? <Redirect to="/"/> : <Profile/>}
            </Route>
            <Route exact path="/settings">
             {!user ? <Redirect to="/"/> : <Settings/>}
            </Route>
            <Route exact path="/about">
             {!user ? <Redirect to="/"/> : <About/>}
            </Route>
          </Switch> 
        </Router>
    </div> 
 );
}

export default App;
