import React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Chat from "./components/Chat"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import Signup from "./components/Signup"
import createHistory from 'history/createBrowserHistory'
import Weather from "./components/Weather"
import Flow from "./components/Flow"
import Favorite from "./components/Favorite"
import ForgotPassword from "./components/ForgotPassword"
import User from "./components/User"
import EditPost from "./components/EditPost"
const history = createHistory();
function App() 
{
    return (
        <Router history={history}>
            <AuthProvider>
                <Switch>
                    <Route default exact path={["/", "/login"]} component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <PrivateRoute exact path="/weather" component={Weather}/>
                    <PrivateRoute exact path="/editPost" component={EditPost}/>
                    <PrivateRoute exact path="/home" component={Home} />
                    <PrivateRoute exact path="/flow" component={Flow} />
                    <PrivateRoute exact path="/favorite" component={Favorite} />
                    <PrivateRoute exact path="/user/:profileUsername" component={User} />
                    <PrivateRoute exact path="/chat" component={Chat} />
                </Switch>
            </AuthProvider>
            <Footer />
        </Router>
    )
}
export default App