import React, { Component } from 'react'
import axios from 'axios'
import './Weather.css'
import Navigation from "./Navigation"
import { Link, withRouter } from 'react-router-dom';
import userIcon from '../images/userIcon.png'
import locationIcon from '../images/locationIcon.png'
import temperatureIcon from '../images/temperatureIcon.png'
import temperatureIcon2 from '../images/temperatureIcon2.png'

class Weather extends Component 
{
    constructor()
    {
        super();
        this.state = 
        {
            comment: '',
            charLimit: 300,
            secili_il_isim: '',
            secili_ilce_isim: '',
            sicaklik: 0,
            hissedilen_sicaklik: 0,
            username: ''
        };
        this.handleChangeComment = this.handleChangeComment.bind(this);
    }

    componentDidMount = () =>
    {
        this.setState
        ({
            username: this.props.location.state.username,
            secili_il_isim: this.props.location.state.il,
            secili_ilce_isim: this.props.location.state.ilce,
            sicaklik: this.props.location.state.sicaklik,
            hissedilen_sicaklik: this.props.location.state.hissedilen_sicaklik
        });
    };
    
    // Post ekleme
    addPost = () =>
    {
        axios.post("/post", null, 
        { 
            params: 
            {
                username: this.state.username,
                il: this.state.secili_il_isim,
                ilce: this.state.secili_ilce_isim,
                sicaklik: this.state.sicaklik,
                hissedilen_sicaklik: this.state.hissedilen_sicaklik,
                yorum: this.state.comment
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
            comment: c
        }, () =>
        {
        });
    }

    // Akış sayfasına geçme
    toFlow = () => 
    {
        this.props.history.push({pathname:"/flow", state:{username: this.state.username}});
    }

    render() 
    {

        return(
            <>
                <Navigation />
                <div className="container">
                    <div className="ui_card">
                        <div className="content">
                            <div className="header"> <img className="userIcon" src={userIcon} />    <Link to={{pathname: "/user/" + this.state.username, state:{username: this.state.username}}}> {this.state.username} </Link></div>
                            <div className="header"> <img className="locationIcon" src={locationIcon} />    {this.state.secili_il_isim} - {this.state.secili_ilce_isim}</div>
                            <div className="header"> <img className="temperatureIcon" src={temperatureIcon} />  {this.state.sicaklik}</div>
                            <div className="header"> <img className="temperatureIcon2" src={temperatureIcon2} />    {this.state.hissedilen_sicaklik}</div>
                            <form className="ui reply form">
                                <div className="field">
                                    <textarea type="text" value={this.state.comment} onChange={this.handleChangeComment}></textarea>
                                </div>
                                <h2>{this.state.charLimit - this.state.comment.length}/{this.state.charLimit}</h2>
                                <div className="ui blue labeled submit icon button" onClick={this.addPost}>
                                    <i className="icon share"></i>Post
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default withRouter(Weather);