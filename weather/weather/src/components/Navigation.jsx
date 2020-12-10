import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, withRouter, useHistory } from "react-router-dom"
import axios from 'axios'
import weatherIcon from '../images/weather.png'
function Navigation(props) 
{
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    async function handleLogout() 
    {  
        setError("")

        try {
            history.push("/login")
            await logout()
        } catch {
            setError("Failed to log out")
        }
    }
    async function toHomePage()
    {
        var name 
        await axios.get("/getUsername",
        {
            params:
            {
                email: currentUser.email
            }
        }).then(response =>
        {
            name = response.data[0].username
        });
        history.push({pathname:"/home", state:{username: name}})
    }

    async function toFlowPage()
    {
        var name 
        var isAdmin
        await axios.get("/getUsername",
        {
            params:
            {
                email: currentUser.email
            }
        }).then(response =>
        {
            name = response.data[0].username
            isAdmin = response.data[0].admin
        });
        history.push({pathname:"/flow", state:{username: name, admin: isAdmin}})
    }

    async function toFavoritePage()
    {
        var name 
        await axios.get("/getUsername",
        {
            params:
            {
                email: currentUser.email
            }
        }).then(response =>
        {
            name = response.data[0].username
        });
        history.push({pathname:"/favorite", state:{username: name}})
    }
    return (
        <div className="navigation">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" onClick={toHomePage}>
                    <img className="userIcon" src={weatherIcon}/>
                    </Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li
                                class={`nav-item  ${
                                    props.location.pathname === "/home" ? "active" : ""
                                }`}
                            >
                                <Link class="nav-link" onClick={toHomePage}>
                                    Ana Sayfa
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                                <li
                                class={`nav-item  ${
                                    props.location.pathname === "/flow" ? "active" : ""
                                }`}
                            >
                                <Link class="nav-link" onClick={toFlowPage}>
                                    Akış
                                </Link>
                            </li>
                            <li
                                class={`nav-item  ${
                                    props.location.pathname === "/favorite" ? "active" : ""
                                }`}
                            >
                                <Link class="nav-link" onClick={toFavoritePage}>
                                    Favoriler
                                </Link>
                            </li>

                            <li
                            class={`nav-item  ${
                                props.location.pathname === "/logout" ? "active" : ""
                            }`}
                            >
                                <Link class="nav-link" onClick={handleLogout}>
                                    Çıkış yap
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default withRouter(Navigation);
