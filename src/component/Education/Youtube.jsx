import React, { Component } from 'react';
import WebService from '../globals/WebService';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { YOUTUBE_CLIENT_ID, YOUTUBE_CHANNEL_ID, YOUTUBE_API_KEY } from '../globals/links';
import { ButtonStyle } from '../styles/style';
import ErrorDisplay from '../globals/Error';


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

    clicked = async () => {
        // if (this.GoogleAuth !== undefined) {
        //     // this.setSigninStatus(this.GoogleAuth)
        // }
        let result = await this.service.sendCall(this.url, "get")
        if (result.status == 200) {
            console.log(result)
            let { data: { items } } = result
            console.log(items)
            this.setState({
                playList: items,
                loading: false,

            })
        } else {
            this.setState({
                loading: false,
                error: {
                    show: true,
                    isError: true,
                    message: "An error occured, Please try again"
                }
            })
        }

    }

    handleChange = ({ target }) => {
        console.log(target.files[0])
        this.setState({ video: target.files[0] });

    }
    fetchChannel = async () => {
        let channel = await window.gapi.client.request({
            path: '/youtube/v3/channels',
            params: {
                part: 'snippet',
                mine: true,
                maxResults: 10
            }
        });
        // console.log(channel)
        // let playlists = await window.gapi.client.youtube
        console.log(window.gapi.client.youtube)
        let playLists = await window.gapi.client.youtube.playlists.list({
            part: 'snippet',
            channelId: YOUTUBE_CHANNEL_ID,

        })
        console.log(playLists)

        // console.log(res)
        // console.log(channels)
        return playLists
    }

    postVideo = async (data) => {
        let channels = await window.gapi.client.request({
            path: '/upload/youtube/v3/videos',
            method: "Post",
            data: data,
            params: {
                part: 'snippet',
                channelId: YOUTUBE_CHANNEL_ID
            },
        });
        return channels.result.items;
    }
    loadVideos = async ({ target: { name, id } }) => {
        // let result = await this.setSigninStatus(this.GoogleAuth)
        // if (result == true) {
            switch (name) {
                case "load":
                    this.setState({
                        loading: true
                    })
                    try {
                        let result = await this.service.sendCall(`https://www.googleapis.com/youtube/v3/playlistItems?key=${this.state.API_KEY}&channelId=${this.state.CHANNEL_ID}&part=snippet,id&order=date&playlistId=${id}`, "get")
                        if (result.status == 200) {
                            console.log(result)
                            let { data: { items } } = result
                            console.log(items)
                            this.setState({
                                result: items,
                                showVideo: false,
                                step: 2,
                                loading: false,

                            })
                        } else {
                            this.setState({
                                loading: false,
                                error: {
                                    show: true,
                                    isError: true,
                                    message: "An error occured, Please try again"
                                }
                            })
                        }
                        // let res = await window.gapi.client.youtube.playlistItems.list({
                        //     part: 'snippet',
                        //     playlistId: id,
                        //     channelId: YOUTUBE_CHANNEL_ID,
                        // })
                        // if (res.status !== 200) {
                        //     this.setState({
                        //         loading: false,

                        //         error: {
                        //             show: true,
                        //             isError: true,
                        //             message: "An error occured, Please try again"
                        //         }
                        //     })
                        // } else {
                        //     this.setState({
                        //         loading: false,

                        //         result: res.result.items,
                        //         showVideo: false,
                        //         step: 2
                        //     })
                        // }

                    } catch (error) {
                        this.setState({
                            loading: false,
                            error: {
                                show: true,
                                isError: true,
                                message: "An error occured, Please try again"
                            }
                        })
                    }

                    this.setState({
                        loading: false
                    })
                    break
                case "play":
                    this.setState({
                        videoId: id,
                        showVideo: true,
                        step: 3

                    })
                    break;
            }
        // }
    }
    upload = async () => {
        let data = []
        if (this.GoogleAuth !== undefined) {
            let result = await this.setSigninStatus(this.GoogleAuth)
            if (result == true) {
                this.setState({
                    loading: true
                })
                // this.fetchChannel()
                try {
                    let playlists = await this.fetchChannel()
                    if (playlists.status !== 200) {
                        this.setState({
                            loading: false,
                            error: {
                                show: true,
                                isError: true,
                                message: "An error occured, Please try again"
                            }
                        })
                    } else {
                        this.setState({
                            loading: false,
                            playList: playlists.result.items
                        })
                    }
                } catch (error) {
                    this.setState({
                        loading: false,
                        error: {
                            show: true,
                            isError: true,
                            message: "An error occured, Please try again"
                        }
                    })


                }
                this.setState({
                    loading: false
                })
            }
        }
    }

    backClick = () => {
        let { step } = this.state
        let newStep
        switch (step) {
            case 2:
                newStep = 1
                break
            case 3:
                newStep = 2;
                break;
            case 1:
            default:
                newStep = 1
                break

        }
        this.setState({
            step: newStep,
            videoId: "",

        })
    }
    render() {
        let { step, error, loading } = this.state
        return (
            <>
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                        <Container fluid={true}>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    {error.show ? (<ErrorDisplay message={error.message} error={error.isError} />) : null}

                                </Col>
                                <Col>
                                    <h3>Play Lists</h3>

                                    {/* <input type="file" name="" id="" onChange={this.handleChange} /> */}
                                    {/* <ButtonStyle className="btn" onClick={this.upload} style={{ display: step == 1 ? "block" : "none" }}>View Playlists</ButtonStyle> */}
                                    <ButtonStyle className="btn btn-danger" onClick={this.backClick} style={{ display: step == 1 ? "none" : "block" }}>Back</ButtonStyle>
                                </Col>
                            </Row>
                            <Row>
                                {this.state.playList.map((playlist, i) => (
                                    <Col lg={6} md={8} sm={8} xs={12} key={i} style={{ display: step == 1 ? "block" : "none" }}>
                                        <img src={playlist.snippet.thumbnails.default.url} width={playlist.snippet.thumbnails.high.width} height={playlist.snippet.thumbnails.high.height} alt="" />
                                        <p>{playlist.snippet.title}</p>
                                        <ButtonStyle className="btn" id={playlist.id} name="load" onClick={this.loadVideos} >View</ButtonStyle>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {this.state.result.map((result, i) => (
                                    <Col lg={6} md={8} sm={8} xs={12} key={i} style={{ display: step == 2 ? "block" : "none" }}>
                                        <img src={result.snippet.thumbnails.high.url} width={result.snippet.thumbnails.high.width} height={result.snippet.thumbnails.high.height} alt="" />
                                        <p>{result.snippet.title}</p>
                                        <ButtonStyle className="btn" onClick={this.loadVideos} name="play" id={result.snippet.resourceId.videoId}>Play</ButtonStyle>
                                    </Col>
                                ))}
                                {this.state.showVideo ? (
                                    <Col lg={12} md={10} sm={10} xs={10} style={{ display: step == 3 ? "block" : "none" }}>
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.state.videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </Col>

                                ) : ""}
                            </Row>
                        </Container>
                    )}
            </>
        )
    }
}