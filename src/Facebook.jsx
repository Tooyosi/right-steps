import React, { Component } from 'react';
import WebService from './component/globals/WebService.js';
import { Row, Col, Container, Spinner } from 'react-bootstrap';


export default class Youtube extends Component {
    constructor() {
        super()
        this.service = new WebService()
        this.GoogleAuth
        this.Scope = "https://www.googleapis.com/auth/youtube.force-ssl"
        this.state = {
            API_KEY: YOUTUBE_API_KEY,
            // API_KEY: "AIzaSyAlCKdczyv7gb_RHNxjm-X4EHyX1T98ZHw",
            CHANNEL_ID: YOUTUBE_CHANNEL_ID,
            result: 10,
            video: "",
            result: [],
            playList: [],
            videoId: "",
            showVideo: false,
            step: 1,
            loading: true,
            error: {
                show: false,
                isError: false,
                message: ""
            }

        }
        this.url = `https://www.googleapis.com/youtube/v3/playlists?key=${this.state.API_KEY}&channelId=${this.state.CHANNEL_ID}&part=snippet,id&order=date`
        this.postUrl = `https://www.googleapis.com/upload/youtube/v3/videos?key=${this.state.API_KEY}&channelId=${this.state.CHANNEL_ID}`
        this.fetchChannel = this.fetchChannel.bind(this)
    }

    setSigninStatus(isSignedIn, callback) {
        var user = isSignedIn.currentUser.get();
        var isAuthorized = user.hasGrantedScopes(this.Scope);
        if (isAuthorized) {
            // callback()
            return true
        } else {
            this.GoogleAuth.signIn()
            return true
        }
    }
    // componentDidUpdate() {
    //     if (this.GoogleAuth !== undefined) {
    //         this.setSigninStatus(this.GoogleAuth)
    //     }
    // }
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.onload = () => {
            console.log("ww")
            window.gapi.load('auth2', () => {
                window.gapi.client.init({
                    'apiKey': this.state.API_KEY,
                    'clientId': YOUTUBE_CLIENT_ID,
                    'scope': this.Scope,
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
                })
                this.GoogleAuth = window.gapi.auth2.getAuthInstance()
                console.log("kakkakak", this.GoogleAuth)
                window.gapi.client.setApiKey(this.state.API_KEY);
                window.gapi.client.load('youtube', 'v3', (res) => {
                    this.setState({ gapiReady: true });
                });
            });
        };
        document.body.appendChild(script);
        this.clicked()
    }



    render() {
        let { step, error, loading } = this.state
        return (
            <></>
            )
    }
}