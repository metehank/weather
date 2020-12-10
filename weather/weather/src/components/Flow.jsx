import React, { Component } from "react";
import axios from 'axios'
import './Flow.css'
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import userIcon from '../images/userIcon.png'
import locationIcon from '../images/locationIcon.png'
import temperatureIcon from '../images/temperatureIcon.png'
import temperatureIcon2 from '../images/temperatureIcon2.png'
import commentIcon from '../images/commentIcon.png'
import calendarIcon from '../images/calendarIcon.png'
import weatherBackground from '../images/weather.jpg'
class Flow extends Component 
{
    constructor()
    {
        super();
        this.state = 
        {
            posts: 
            [
                {
                    id: 1,
                    username: '',
                    il: '',
                    ilce: '',
                    sicaklik: 0,
                    hissedilen_sicaklik: 0,
                    yorum: '',
                    yorum_tarih: ''
                }
            ],
            username: '',
            isAdmin: false
        };
    }

    componentDidMount = () =>
    {
        this.setUsername()
        this.setAdmin()
    };

    //Username
    setUsername = () =>
    {
        if(this.state.username == '')
        {
            this.setState
            ({
                username: this.props.location.state.username
            }, () =>
            {
                this.getPosts();
            });
        }
        else
        {
            this.getPosts();
        }
            
    }

    //Admin
    setAdmin = () =>
    {
        axios.get("/getAdminInfo",
        {
            params:
            {
                username: this.props.location.state.username
            }
        }).then(response =>
        {
            this.setState
            ({
                isAdmin: (response.data[0].admin == 0) ? false : true
            });
        });
    }
    // Tüm postları çekme
    getPosts = () =>
    {
        console.log(this.state.username)
        axios.get("/getPosts").then(response =>
        {
            let tempArray = []
            for(var i = 0 ; i < response.data.length ; i++)
            {
                tempArray.push
                ({
                    id: response.data[i].id,
                    username: response.data[i].username,
                    il: response.data[i].il,
                    ilce: response.data[i].ilce,
                    sicaklik: response.data[i].sicaklik,
                    hissedilen_sicaklik: response.data[i].hissedilen_sicaklik,
                    yorum: response.data[i].yorum,
                    yorum_tarih: response.data[i].yorum_tarih
                });
            }
            this.setState
            ({
                posts: tempArray
            });
        });
    }

    // Post silme
    deletePost = (post_id) =>
    {
        axios.delete("/deletePost",
        { 
            params: 
            {
                id: post_id
            }
        }, null).then(response =>
        {
        });
        this.getPosts();
    }

    // Favori ekleme
    addFavorite = (post_id) =>
    {
        axios.post("/addFavorite", null,
        { 
            params: 
            {
                username: this.state.username,
                id: post_id
            }
        }).then(response =>
        {
        });
    }

    // Post editleme
    editPost = (post_id, post_username, post_il, post_ilce, post_sicaklik, post_hissedilen_sicaklik, post_yorum, post_yorum_tarih) =>
    {
        this.props.history.push({pathname:"/editPost", 
            state:{post_id: post_id, 
                post_username: post_username, 
                post_il: post_il, 
                post_ilce: post_ilce, 
                post_sicaklik: post_sicaklik, 
                post_hissedilen_sicaklik: post_hissedilen_sicaklik, 
                post_yorum: post_yorum,
                post_yorum_tarih: post_yorum_tarih }});
    }
    render() 
    {
        const post = this.state.posts.map((post) =>
        <li key={post.id}>
            <div className="ui_card">
                <div className="content">
                    <div className="header"> <img className="userIcon" src={userIcon} />    <Link to={{pathname: "/user/" + post.username, state:{username: this.state.username}}}> {post.username} </Link></div>
                    <div className="header"> <img className="locationIcon" src={locationIcon} />    {post.il} - {post.ilce}</div>
                    <div className="header"> <img className="temperatureIcon" src={temperatureIcon} />  {post.sicaklik}</div>
                    <div className="header"> <img className="temperatureIcon2" src={temperatureIcon2} />    {post.hissedilen_sicaklik}</div>
                    <div className="header" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> <img className="commentIcon" src={commentIcon} />
                        {post.yorum}
                    </div>
                    <div className="description"> <img className="calendarIcon" src={calendarIcon} />   {post.yorum_tarih}</div>
                </div>
                <div className="extra_content">
                    
                    <div className="ui red labeled submit icon button" onClick={() => this.addFavorite(post.id)}>
                        <i className="icon heart"></i>Favori Ekle
                    </div>
                    {
                        (this.state.username == post.username) &&
                        <div className="ui green labeled submit icon button" onClick={() => this.editPost(post.id, post.username, post.il, post.ilce, post.sicaklik, post.hissedilen_sicaklik, post.yorum, post.yorum_tarih)}>
                            <i className="icon edit"></i>Düzenle
                        </div>
                    }
                    {
                        (this.state.username == post.username || this.state.isAdmin == true) &&
                        <div className="ui brown labeled submit icon button" onClick={() => this.deletePost(post.id)}>
                            <i className="icon trash"></i>Sil
                        </div>
                    }
                </div>
            </div>
        </li>
    );
    return (
        <>
            <div className="fixed-top">
                <Navigation />
            </div>    
            <div className="text-center">
                <h1>Akış</h1>
                <div className="welcomeText">
                    <h1>Akış</h1>
                </div>
            </div>
            <div className="container">
                <ul className="posts">{post}</ul>
            </div>
        </>
    );
    }
}
export default Flow;
