import React, { Component } from "react";
import axios from 'axios'
import './User.css'
import Navigation from "./Navigation";
import { Link, withRouter } from "react-router-dom";
import {Launcher} from 'react-chat-window'
import Chat from "./Chat";
class User extends Component 
{
    constructor()
    {
        super();
        this.state = 
        {
            username: '',
            profileUsername: '',
            profileEmail: ''
        };
    }

    componentDidMount = () =>
    {
        console.log(this.props.match.params.profileUsername)
        this.setUsername()
    };

    //Username
    setUsername = () =>
    {
        if(this.state.username == '' || this.state.profileUsername == '')
        {
            this.setState
            ({
                username: this.props.location.state.username,
                profileUsername: this.props.match.params.profileUsername
            });  
        }     
        this.getEmail()
    }
    
    getEmail = () =>
    {
        axios.get("/getEmail",
        {
            params:
            {
                username: this.props.match.params.profileUsername
            }
        }).then(response =>
        {
            const peerEmail = response.data[0].email
            this.setState
            ({
                profileEmail: peerEmail
            });  
        });
    }

    sendMessage = () =>
    {
        axios.get("/getEmail",
        {
            params:
            {
                username: this.state.profileUsername
            }
        }).then(response =>
        {
            const peerEmail = response.data[0].email
            console.log(peerEmail)
            this.props.history.push({pathname:"/chat", state:{peerEmail: peerEmail}});
        });
    }
    render() 
    {
        return (
            <>
                <div className="fixed-top">
                    <Navigation />
                </div>
                <div className="container">
                    <div className="text-center">
                        <div className="ui_card">
                        <h1>{this.state.profileUsername}'s Profile</h1>
                        {
                            (this.state.username !=  this.state.profileUsername) &&
                            <div className>
                                { <Chat profileUsername={this.props.match.params.profileUsername} peerEmail={this.state.profileEmail}/> }
                            </div>
                        }
                        </div>  
                    </div>   
                </div>    
            </>
        );
    }
}
export default withRouter(User);
