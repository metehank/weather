import React, { Component } from 'react'
import axios from 'axios'
import './Weather.css'
import Navigation from "./Navigation"
import { withRouter } from 'react-router-dom';
import userIcon from '../images/userIcon.png'
import locationIcon from '../images/locationIcon.png'
import temperatureIcon from '../images/temperatureIcon.png'
import temperatureIcon2 from '../images/temperatureIcon2.png'
import commentIcon from '../images/commentIcon.png'
import calendarIcon from '../images/calendarIcon.png'

class EditPost extends Component 
{
    constructor()
    {
        super();
        this.state = 
        {
            post_yorum: '',
            post_yorum_tarih: '',
            charLimit: 300,
            post_il: '',
            post_ilce: '',
            post_sicaklik: 0,
            post_hissedilen_sicaklik: 0,
            post_username: '',
            post_id: 0
        };
        this.handleChangeComment = this.handleChangeComment.bind(this);
    }

    componentDidMount = () =>
    {
        this.setState
        ({

            post_id: this.props.location.state.post_id,
            post_username: this.props.location.state.post_username,
            post_il: this.props.location.state.post_il,
            post_ilce: this.props.location.state.post_ilce,
            post_sicaklik: this.props.location.state.post_sicaklik,
            post_hissedilen_sicaklik: this.props.location.state.post_hissedilen_sicaklik,
            post_yorum: this.props.location.state.post_yorum,
            post_yorum_tarih: this.props.location.state.post_yorum_tarih
        });
    };
    
    // Post editleme
    savePost = () =>
    {
        console.log("123123asd")
        axios.put("/saveEditedPost", null, 
        { 
            params: 
            {
                post_id: this.state.post_id,
                post_username: this.state.post_username,
                post_il: this.state.post_il,
                post_ilce: this.state.post_ilce,
                post_sicaklik: this.state.post_sicaklik,
                post_hissedilen_sicaklik: this.state.post_hissedilen_sicaklik,
                post_yorum: this.state.post_yorum
            }
        }).then(response =>
        {
            
        });
        this.toFlow();
    }
    
    // Yorum değiştiğinde düzenleme
    handleChangeComment(event)
    {
        var c = event.target.value + ""
        c = c.substring(0,300)
        this.setState
        ({
            post_yorum: c
        }, () =>
        {
        });
    }

    // Akış sayfasına geçme
    toFlow = () => 
    {
        // this.props.history.push("/flow");
        this.props.history.push({pathname:"/flow", state:{username: this.state.post_username}});
    }

    render() 
    {
        return(
            <>
                <Navigation />
                <div className="container">
                    <div className="ui_card">
                        <div className="content">
                            <div className="header"> <img className="userIcon" src={userIcon} />{this.state.post_username}</div>
                            <div className="header"> <img className="locationIcon" src={locationIcon} />    {this.state.post_il} - {this.state.post_ilce}</div>
                            <div className="header"> <img className="temperatureIcon" src={temperatureIcon} />  {this.state.post_sicaklik}</div>
                            <div className="header"> <img className="temperatureIcon2" src={temperatureIcon2} />    {this.state.post_hissedilen_sicaklik}</div>
                            <div className="description"> <img className="calendarIcon" src={calendarIcon} />   {this.state.post_yorum_tarih}</div>
                            <form className="ui reply form">
                                <div className="field">
                                    <textarea type="text" value={this.state.post_yorum} onChange={this.handleChangeComment}></textarea>
                                </div>
                                <h2>{this.state.charLimit - this.state.post_yorum.length}/{this.state.charLimit}</h2>
                                <div className="ui blue labeled submit icon button" onClick={this.savePost}>
                                    <i className="icon save"></i>Save
                                </div>
                            </form>
                        </div>
                    </div> 
                </div>
            </>
        );
    }
}
export default withRouter(EditPost);