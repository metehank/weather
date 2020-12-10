import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'
import { Link, withRouter } from "react-router-dom"
import Navigation from './Navigation';
import weatherBackground from '../images/weather.jpg'

class Home extends Component 
{
    constructor()
    {
        super();
        this.state = 
        {
            il_isim: [],
            ilce_isim: [],
            secili_il_plaka: 1,
            secili_il_isim: '',
            secili_ilce_isim: '',
            sicaklik: 0,
            hissedilen_sicaklik: 0,
            username: ''
        };
    }

    componentDidMount = () =>
    {
        axios.get("/getIller").then(response =>
        {
            let tempArray = []
            tempArray.push("İl seçiniz")
            for(var i = 0 ; i < response.data.length ; i++)
            {
                tempArray.push(response.data[i].isim)
            }
            this.setState
            ({
                il_isim: tempArray,
                secili_il_isim: 'İl seçiniz',
                secili_ilce_isim: 'İlçe seçiniz',
                secili_il_plaka: 0,
                sicaklik: 0,
                hissedilen_sicaklik: 0
            });
            this.getIlceler()
        });
        if(this.state.username == '')
        {
            this.setState
            ({
                username: this.props.location.state.username
            });
        }
    };

    // İl seçme
    handleChangeIl(event) 
    {
        this.setState
        ({
            secili_il_isim: event.target.value
        });
        if(event.target.value != "İl seçiniz")
        {
            axios.get("/getIlPlaka",
            {
                params:
                {
                    isim: event.target.value
                }
            }).then(response =>
            {
                this.setState
                ({
                    secili_il_plaka: response.data[0].il_no
                });
                this.getIlceler()
            });
        }
        
    }

    // İlçe seçme
    handleChangeIlce(event) 
    {
        this.setState
        ({
            secili_ilce_isim: event.target.value
        }, () =>
        {
        });

    }

    // Seçilen ile göre ilçeleri çekme
    getIlceler()
    {
        
        if(this.state.secili_il_plaka != 0)
        {
            axios.get("/getIlceler",
            {
                params:
                {
                    plaka: this.state.secili_il_plaka
                }
            }).then(response =>
            {
                let tempArray = []
                tempArray.push("İlçe seçiniz")
                for(var i = 0 ; i < response.data.length ; i++)
                {
                    tempArray.push(response.data[i].isim)
                }
                this.setState
                ({
                    ilce_isim: tempArray,
                    secili_ilce_isim: tempArray[0]
                });
            });
        }
        
    }

    // Seçilen ilçeye göre hava durumunu çekme
    getWeatherData = () =>
    {
        if(this.state.secili_ilce_isim != "İlçe seçiniz")
        {
            axios.get("/getWeather",
            {
                params:
                {
                    isim: this.state.secili_ilce_isim
                }
            }).then(response =>
            {
                this.setState
                ({
                    sicaklik: response.data[0],
                    hissedilen_sicaklik: response.data[1],
                });
                this.toWeatherPage()
            });
        }
        
    }

    toWeatherPage = () =>
    {
        this.props.history.push({pathname:"/weather", state:{username: this.state.username, il: this.state.secili_il_isim, ilce: this.state.secili_ilce_isim, sicaklik: this.state.sicaklik, hissedilen_sicaklik: this.state.hissedilen_sicaklik}});
    }
    
    render() 
    {
        var Data = this.state.il_isim
        var Data2 = this.state.ilce_isim,
        iller = function(X) 
        {
            return <option>{X}</option>;
        };
        return(
            <>
                <Navigation  />
                <div className="container" >
                    <div className="text-center">
                        <div className="welcomeText">
                            <h1>Hoş geldiniz {this.state.username}</h1>
                        </div>
                        <div className="ui_card" style={{ backgroundImage:`url(${weatherBackground})` }}>
                            <div className="search_background">
                                <select className="selectOption" ref="selectOption" onChange={(e) => this.handleChangeIl(e)}>{Data.map(iller)}</select>
                                <select className="selectOption" ref="selectOption" onChange={(e) => this.handleChangeIlce(e)}>{Data2.map(iller)}</select>
                                <Link className="ui green labeled submit icon button" onClick={this.getWeatherData}>
                                    <i className="icon search"></i>Sorgula
                                </Link>
                            </div>
                        </div>  
                    </div>   
                </div>
            </>
        );
    }
}
export default withRouter(Home);