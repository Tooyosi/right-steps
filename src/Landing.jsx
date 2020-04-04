import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Nav, Button, Carousel, Image, Navbar, Modal, Accordion, Card } from 'react-bootstrap';
import CarouselSlide from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Contain, NavStyle, CarouselStyle, AboutStyle, CoursesStyle, RegisterStyle, RegisterFormStyle, TestimonialsStyle, FAQStyle, FooterStyle } from './component/styles/style.jsx'
import { SignupForm } from './component/forms/Signup.jsx';
import Logo from './../assets/logo.png'
import Slide1 from './../assets/right_education.png'
import Slide2 from './../assets/live_your_dreams.png'
import Slide3 from './../assets/administration.png'
import About1 from './../assets/about1.png'
import Courses1 from './../assets/forex_trading.jpg'
import Stage1 from './../assets/stage1.jpg'
import Stage2 from './../assets/stage2.jpg'
import Courses2 from './../assets/global_stocks.jpg'
import Courses3 from './../assets/courses3.png'
import Courses4 from './../assets/courses4.png'
import Business from './../assets/business.jpg'
import Vision from './../assets/vision.jpg'
import Philosophy from './../assets/philosophy.jpg'
import { FACEBOOK_ACCESS_TOKEN, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from './component/globals/links.js';
import WebService from './component/globals/WebService.js';
import { useEffect } from 'react';
import parse from 'html-react-parser';
import { twitter } from 'react-icons-kit/fa/twitter'
import Icon from 'react-icons-kit';
import { facebook } from 'react-icons-kit/fa/facebook'
import { instagram } from 'react-icons-kit/fa/instagram'
const Landing = () => {
    const [about, updateAbout] = useState(1)
    const [formState, updateFormState] = useState(1)
    let [showModal, updateShowModal] = useState(false)
    const [facebookPosts, updateFacebookPosts] = useState({
        data: []
    })
    const submitForm = ({ target }) => {
        let { id } = target
        switch (id) {
            case "Next":
                updateFormState(2);
                break;
            case "Back":
                updateFormState(1);
                break;
            case "Submit":
                // submit the form
                break;
            default:
                break;
        }
    }
    let service = new WebService()
    const handleClose = () => {
        updateShowModal(false)
    }

    const displayModal = () => {
        updateShowModal(true)
    }
    const aboutClick = ({ target }) => {
        let { id } = target;
        switch (id) {
            case "mission":
                if (about !== 1) {
                    updateAbout(1)
                }
                break;
            case "vision":
                if (about !== 2) {
                    updateAbout(2)
                }
                break;
            case "business":
                if (about !== 3) {
                    updateAbout(3)
                }
                break;
            case "philosophy":
                if (about !== 4) {
                    updateAbout(4)
                }
                break;
        }
    }

    let fetchFbPosts = async () => {
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=548599319409205&autoLogAppEvents=1";
        script.crossOrigin = "anonymous"
        document.body.appendChild(script);

        // let result = await service.sendCall(
        //     `https://graph.facebook.com/v6.0/me/posts?access_token=${FACEBOOK_ACCESS_TOKEN}&debug=all&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors`, "Get"
        //     // `https://graph.facebook.com/oauth/access_token?client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&grant_type=client_credentials`
        // )
        // if (result.status == 200) {
        //     let { data } = result
        //     let { access_token } = data
        //     // console.log(access_token)
        //     // let fetchFeeds = await service.sendCall(`https://graph.facebook.com/v2.9/LADbible/posts?access_token=548599319409205|V1OUY4zn_XwlWkxWUdN8BRZIuSM`, "Get" )   
        //     // console.log(fetchFeeds)
        //     console.log(data)
        //     // updateFacebookPosts(data)
        // }

        // console.log(result)
        // console.log("here 1")

        // console.log("here 2")

        // script.onload = () => {
        //     console.log("here 3")


        //     window.FB.init({
        //         appId: `${FACEBOOK_APP_ID}`,
        //         autoLogAppEvents: true,
        //         xfbml: true,
        //         version: 'v6.0'
        //     });

        //     window.FB.ui({
        //         method: 'share',
        //         href: 'https://developers.facebook.com/docs/'
        //       }, function(response){
        //           console.log(response)
        //       });


        //     // window.FB.login((response) => {
        //     //     if (response.authResponse) {
        //     //         console.log('Welcome!  Fetching your information.... ');
        //     //         FB.api('/me', function (response) {
        //     //             console.log('Good to see you, ' + response.name + '.');
        //     //         });
        //     //     } else {
        //     //         console.log('User cancelled login or did not fully authorize.');
        //     //     }
        //     // })
        //     console.log(window.FB)

        // }


    }
    useEffect(() => {
        fetchFbPosts()


    }, [])
    return (
        <Fragment>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Getting started with FOREX</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5><a href="https://alpari.com/en/registration/?platform=mt4">Open an account</a></h5>
                        <p>
                            If you have never worked with Forex before, you can get acquainted
                            with the ins and outs of currency trading on a demo account with virtual
                            funds. With a demo account, you'll be able to explore the Forex market from within and develop your own trading strategy.
                                    </p>
                    </div>
                    <div>
                        <h5><a href="https://alpari.com/en/registration/?platform=mt4">Download the trading terminal</a></h5>
                        <p>
                            After you have opened an account, whether it be a demo or live account,
                            you will need to download MetaTrader 4 or 5; a special program for trading
                            on the Forex market. In the terminal, you can keep track of market quotes,
                            make trades by opening and closing positions, and stay up to date with financial news.
                            The terminal is available on PC as well as on mobile devices.
                                    </p>
                    </div>
                    <div>
                        <h5><a href="https://alpari.com/en/registration/?platform=mt4">Top up your account and start trading</a></h5>
                        <p>
                            You can start trading on the Forex market with any amount of funds on your account.
                            If you would like to try trading Forex on a live account,
                            but you'd also like to keep risk to a minimum, try trading with a nano.mt4 account,
                            where currency is traded in eurocents and US dollar cents.
                                </p>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                            </Button>

                </Modal.Footer>
            </Modal>

            <NavStyle>
                <Contain>
                    <Navbar bg="" expand="lg">
                        <Navbar.Brand href="#home">
                            <Image src={Logo} fluid width="100px" />
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="#">Home</Nav.Link>
                                <Nav.Link href="#about">About</Nav.Link>
                                <Nav.Link href="#courses">Courses</Nav.Link>
                                <Nav.Link href="#register">Earn With Us</Nav.Link>
                                <Nav.Link href="#contact">Contact</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="signin">
                                    <Button className="nav-buttons">Sign In</Button>
                                </Nav.Link>
                                <Nav.Link href="/signup">
                                    <Button className="nav-buttons">Sign Up</Button>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Contain>
            </NavStyle>
            <Contain>
                <Col lg={12}>
                    <CarouselStyle>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Slide1}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Slide2}
                                    alt="Third slide"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Slide3}
                                    alt="Third slide"
                                />

                            </Carousel.Item>
                        </Carousel>
                    </CarouselStyle>
                </Col>
                <Col lg={12}>
                    <AboutStyle id="about">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <h1>Who We Are</h1>
                                </Col>
                                <Col className="toggle" lg={12}>
                                    <Row>
                                        <Col lg={3} md={3} sm={2}>
                                            <h3 style={{ opacity: about == 1 ? "0.5" : "1" }} onClick={aboutClick} id="mission"> Our Mission</h3>
                                        </Col>
                                        <Col lg={3} md={3} sm={2}>
                                            <h3 style={{ opacity: about == 2 ? "0.5" : "1" }} onClick={aboutClick} id="vision">Our Vision</h3>
                                        </Col>
                                        <Col lg={3} md={3} sm={2}>
                                            <h3 style={{ opacity: about == 3 ? "0.5" : "1" }} onClick={aboutClick} id="business">Our Business</h3>
                                        </Col>
                                        <Col lg={3} md={3} sm={2}>
                                            <h3 style={{ opacity: about == 4 ? "0.5" : "1" }} onClick={aboutClick} id="philosophy">Our Philosophy</h3>
                                        </Col>
                                        <Col className="hr" lg={12}>
                                            <Row>
                                                <Col className={about == 1 ? "active" : 'not-active'} lg={2} md={2} sm={2}></Col>
                                                <Col className={about == 2 ? "active" : 'not-active'} lg={2} md={2} sm={2}></Col>
                                                <Col className={about == 3 ? "active" : 'not-active'} lg={2} md={2} sm={2}></Col>
                                                <Col className={about == 4 ? "active" : 'not-active'} lg={2} md={2} sm={2}></Col>
                                            </Row>
                                        </Col>
                                        <Col className="details" style={{ display: about == 1 ? "block" : "none" }} lg={12}>
                                            <Row>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Image
                                                        src={About1}
                                                        rounded
                                                        width="100%"
                                                        fluid
                                                    />
                                                </Col>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <p>To deliver cutting edge FOREX training and coaching in a fun filled, relaxed manner.</p>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <Button onClick={displayModal}>Learn More</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col className="details" style={{ display: about == 2 ? "block" : "none" }} lg={12}>
                                            <Row>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Image src={Vision} rounded
                                                        width="100%"
                                                        fluid
                                                    />
                                                </Col>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <p>To help two million people around the world find financial freedom and live their dreams through FOREX trading, by 2030. </p>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <Button onClick={displayModal}>Learn More</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col className="details" style={{ display: about == 3 ? "block" : "none" }} lg={12}>
                                            <Row>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Image src={Business} rounded
                                                        width="100%"
                                                        fluid
                                                    />
                                                </Col>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <p>
                                                                Right Steps Foundation is a leading Non Governmental
                                                                Organization gaining popularity around the African
                                                                Continent as a leading provider of cutting edge training
                                                                and coaching in the areas of trading financial instruments
                                                                like FOREX,
                                                                Global Stocks, Commodities, Futures, Binary Options, etc.
                                                                </p>
                                                            <p>
                                                                The FOREX is by far the largest financial market in the
                                                                world with a daily turnover of 5.3 Trillion dollars.
                                                                The Forex (FOReign EXchange) market appeared at the end
                                                                of the 1970s after many countries decided to unpeg their
                                                                currency value from that of the US dollar or gold.
                                                                This led to the formation of an international market
                                                                on which currency could be exchanged and traded freely.
                                                                Today, Forex is the largest financial market in the world.
                                                                It doesn’t matter where you live or even where you are right now;
                                                                as long as you have access to the Internet, a trading terminal, and
                                                                an account with a Forex broker, all the instruments
                                                                and opportunities of Forex are available to you.
                                                                </p>

                                                            <p>
                                                                FOREX is about trying to ascertain the direction
                                                                in which the value of a currency will go and make a
                                                                trade for the purchase or sale of that currency.
                                                                As such, by buying a currency cheaper and selling it for
                                                                more, traders earn money on the Forex market. Traders
                                                                make their decisions based on the analysis of all factors
                                                                that can affect prices; allowing them to work out precisely
                                                                in which direction prices are moving. You can make a profit
                                                                on the Forex market when the value of a currency drops as well
                                                                as when it increases. But the truth is that making money in the
                                                                FOREX market is not as easy as it sounds. We also found out that
                                                                the best approach to helping people find their feet in this market is
                                                                by coaching and not just training. Which is why we launched our FOREX academy
                                                                where people can learn FOREX trading at their pace and convenience.
                                                                And all that is required to be a lifetime member of Right Steps Foundation so that
                                                                you can learn to trade the FOREX like a PRO is a onetime donation of $30 only.
                                                                Furthermore, traders can make trades
                                                                on the Forex market from anywhere in the world.
                                                                </p>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <Button onClick={displayModal}>Learn More</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col className="details" style={{ display: about == 4 ? "block" : "none" }} lg={12}>
                                            <Row>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Image src={Philosophy}
                                                        rounded
                                                        width="100%"
                                                        fluid
                                                    />
                                                </Col>
                                                <Col lg={6} md={6} sm={6}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <p style={{ textTransform: "capitalize" }}>
                                                                {/* FOREX is about trying to ascertain the direction
                                                                in which the value of a currency will go and make a
                                                                trade for the purchase or sale of that currency.
                                                                As such, by buying a currency cheaper and selling it for
                                                                more, traders earn money on the Forex market. Traders
                                                                make their decisions based on the analysis of all factors
                                                                that can affect prices; allowing them to work out precisely
                                                                in which direction prices are moving. You can make a profit
                                                                on the Forex market when the value of a currency drops as well
                                                                as when it increases. But the truth is that making money in the
                                                                FOREX market is not as easy as it sounds. We also found out that
                                                                the best approach to helping people find their feet in this market is
                                                                by coaching and not just training. Which is why we launched our FOREX academy
                                                                where people can learn FOREX trading at their pace and convenience.
                                                                And all that is required to be a lifetime member of Right Steps Foundation so that
                                                                you can learn to trade the FOREX like a PRO is a onetime donation of $30 only.
                                                                Furthermore, traders can make trades
                                                                on the Forex market from anywhere in the world. */}
                                                                At right steps foundation, we believe in transformational leadership,
                                                                so we literally take our members by the hand and show them the inn roads of
                                                                the global financial markets until they are comfortable enough to trade the
                                                                markets for themselves while helping others do the same. So with a one time donation of $30,
                                                                you get a lifetime memberships  and become a lifetime student of right steps foundation and
                                                                learn how to trade the global financial markets at your own pace and convinience.
                                                                </p>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <Button onClick={displayModal}>Learn More</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </AboutStyle>
                    <Col lg={12}>
                        <CoursesStyle id="courses">
                            <Container fluid={true}>
                                <Row>
                                    <Col lg={12} className="text-center">
                                        <h2>COURSES WE OFFER</h2>
                                    </Col>
                                    <Col lg={12}>
                                        <CarouselSlide
                                            additionalTransfrom={0}
                                            arrows
                                            autoPlaySpeed={3000}
                                            centerMode={false}
                                            containerClass="container-with-dots"
                                            draggable
                                            focusOnSelect={false}
                                            infinite
                                            focusOnSelect
                                            keyBoardControl
                                            minimumTouchDrag={80}
                                            renderButtonGroupOutside={false}
                                            renderDotsOutside={false}
                                            responsive={{
                                                desktop: {
                                                    breakpoint: {
                                                        max: 3000,
                                                        min: 1024
                                                    },
                                                    items: 3,
                                                    partialVisibilityGutter: 40
                                                },
                                                mobile: {
                                                    breakpoint: {
                                                        max: 464,
                                                        min: 0
                                                    },
                                                    items: 2,
                                                    partialVisibilityGutter: 30
                                                },
                                                tablet: {
                                                    breakpoint: {
                                                        max: 1024,
                                                        min: 464
                                                    },
                                                    items: 3,
                                                    partialVisibilityGutter: 30
                                                }
                                            }}
                                            showDots={false}
                                            sliderClass=""
                                            slidesToSlide={1}
                                            swipeable
                                        >
                                            <Col lg={8}>
                                                <Image
                                                    src={Courses1}
                                                    height="160px"
                                                    width="90%"
                                                    rounded
                                                />
                                                <h5 style={{ width: "60%", margin: "0px auto", marginTop: "20px" }}>FOREX</h5>
                                                {/* <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Basics of Global Stocks Trading</p> */}
                                                <ol>
                                                    <li>Basics of FOREX trading</li>
                                                    <li>Intermediate  FOREX trading</li>
                                                    <li>Advanced   FOREX trading</li>

                                                </ol>
                                            </Col>

                                            <Col lg={8}>
                                                <Image
                                                    src={Courses2}
                                                    height="160px"
                                                    width="90%"
                                                    rounded
                                                />
                                                <h5 style={{ width: "60%", margin: "0px auto", marginTop: "20px" }}>GLOBAL STOCKS</h5>

                                                {/* <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Intermediate Global Stocks trading</p> */}
                                                <ol>
                                                    <li>Basics of Global Stocks  trading</li>
                                                    <li>Intermediate  Global Stocks  trading</li>
                                                    <li>Advanced   Global Stocks  trading</li>

                                                </ol>
                                            </Col>
                                            {/* <Col lg={8}>
                                                <Image
                                                    src={Courses3}
                                                    height="160px"
                                                    width="90%"
                                                    rounded
                                                />

                                                <p style={{ width: "60%", margin: "0px auto", marginTop: "20px" }}>Advanced Global Stocks Trading.</p>
                                            </Col> */}
                                            {/* <Col lg={8}>
                                              <Image 
                                                src={Courses4}
                                                height="160px"
                                                width="90%"
                                                rounded
                                                />

                                              <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                          </Col> */}
                                        </CarouselSlide>
                                    </Col>
                                </Row>
                            </Container>
                        </CoursesStyle>
                    </Col>
                    <Col lg={12}>
                        <RegisterStyle id="register">
                            <Container fluid={true}>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <h3>REGISTER WITH US <br /> TODAY</h3>
                                        <div>
                                            <div className="grow">

                                                <div className="list">
                                                </div>
                                                <div>
                                                    <span className="ball-span col-lg-12">
                                                        <span className="col-lg-12 balls"></span>
                                                        <h3>GET EDUCATED ON THE GLOBAL FINANCIAL MARKETS</h3>
                                                    </span>
                                                    <span className="ball-span col-lg-12">
                                                        <span className="col-lg-12 balls"></span>
                                                        <h3>Earn With Us</h3>
                                                    </span>
                                                    <span className="ball-span col-lg-12">
                                                        <span className="col-lg-12 balls"></span>
                                                        <h3>Invite Friends</h3>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} >
                                        <SignupForm />
                                    </Col>
                                </Row>
                            </Container>
                        </RegisterStyle>
                    </Col>
                    <TestimonialsStyle>
                        <Container fluid={true}>
                            <Row>
                                <Col lg={12}>
                                    <Col className="text-center">
                                        <h3>TESTIMONIALS</h3>
                                    </Col>
                                </Col>
                                <Col lg={12}>
                                    <CarouselSlide
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        centerMode={false}
                                        containerClass="container-with-dots"
                                        draggable
                                        focusOnSelect={false}
                                        infinite
                                        focusOnSelect
                                        keyBoardControl
                                        minimumTouchDrag={80}
                                        renderButtonGroupOutside={false}
                                        renderDotsOutside={false}
                                        responsive={{
                                            desktop: {
                                                breakpoint: {
                                                    max: 3000,
                                                    min: 1024
                                                },
                                                items: 3,
                                                partialVisibilityGutter: 40
                                            },
                                            mobile: {
                                                breakpoint: {
                                                    max: 464,
                                                    min: 0
                                                },
                                                items: 2,
                                                partialVisibilityGutter: 30
                                            },
                                            tablet: {
                                                breakpoint: {
                                                    max: 1024,
                                                    min: 464
                                                },
                                                items: 3,
                                                partialVisibilityGutter: 30
                                            }
                                        }}
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={1}
                                        swipeable
                                    >
                                        <Col lg={8}>
                                            <div className="message text-center">

                                                <Image
                                                    src="data:image/jpeg;base64,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"
                                                    height="160px"
                                                    width="60%"
                                                    roundedCircle
                                                />
                                                <div className="paragraph">
                                                    <p>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                                </div>
                                            </div>

                                        </Col>
                                        <Col lg={8}>
                                            <div className="message text-center">

                                                <Image
                                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsBFQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEgQAAIBAwIDBQUDBgwEBwAAAAECAwAEERIhBTFBBhMiUWEycYGR0QcUoRYjQpPB8BUkM0NSVGJyc5Kx4VPC0vEmNDVEgoOi/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAeEQACAgMBAQEBAAAAAAAAAAAAAQIRAxIhMUETUf/aAAwDAQACEQMRAD8A7wYpYFBDU+us9WabILgU4UUHWafvKVMeyDaBTFBUO8p9dHR2htFLSR0pa6WujocEAakKhqptRoCw4xT7UAORTiY+VKmFoKQKfAoXfHqKl3/pSpjtE9FLTUe9HnT94POlQWPppaaWsedLWKBixTYp9QPWlqFAESKbFOZY9RUuuodM0+RjPSgCNRxUiwptQoAbFLBpahTa6AHxSxTaxS1igB8U2KbVS1Uhj0qiWptdAE8U2KgXptdOhE2FKhl6VACC+tPp9ajJIkP8o2KjFdW8ucSYwN9q2+WY0E0+tQd1QgOwGaTOQnwzk7CgNdW9sTriaaVR4UOwJPn9Ka6DVBu8yxCDUoG79B8afvV0qxYDV0z64oEAub6RHuB4OaKBgAegqdz3UGcrvtgY2xnehrtCS5Ycc8Ag/Gn93QVntO7MWCrGR0QYxR7IEyh5SWTOSp5Emm416C74GeQJ0Zsc9IzioJcRumoE+o6ijwktlSOZHMVSvD/GnBjEYPslfKpj1jaLSOrlgG9nnmhRXcMmfFp9/WhwL+YkZz7WCPPY1Se3kXIwcHnitIxRLZra00atYweVNE6yoWQ7A4NZkbNGMYyPKjIzg64sZPMedDhQtjQ0++mI+HvNUBLMdtT8886nJKssYTSc5ySTU6Mq7DvcxR48RbPVRkUIX4LYC4GM5Y4qrzbScqo2wKRgKtgrkedX+cSdmEk4g7rpXwb+0K0OHN4nd3Oc43NZy2mobDUT5daPNGbQ5kJZwSF0t4c9c1MoxfEVFyXWVuJCM8RmkeUPg7aDnJxsM09rdyRSaJmLK/8ASPI0OInX4gDk0S4ACBdIK6R8K01VUZ7P0uSXar7St7wM1OOUSxB0OQfwrL05TwHFGtmaBg5GUcYNZyxJLhayNsv5NNk0+pWfSGGSuoDO+KloPkaxo1shv50t/Opaf+1LRQFkd/Olv51IrgZOwG5yaqS30MTaSrttnIXamo7eCcqLNKhW833gN3SguOUZbBIqqvEh3hWaF48HG2/z8qaxtg5pF7HrTY9ahBcQ3AJice5tj8qLpNS00NSTBt76VSZTSoodggjyae8QHJxrO+PWpILWKcxKysd/G3I+4CoPPNIvdnaMY2UbUNbRz48YxvnFb6/1mOyfhqh0FsWiUNNyUhdl9ay0thDli2tjvpG5z61aMLNCdDhAvTB1MakltNlQ7sxI9nHL31mnqW1YGK6leTTK4Qnbnj4Y6UaaMyKkckDHUSAxOkDHlV6GyC4ZY4lI/SZN/gTUZ5pEDa9GeWSCc1O1vhVc6ZRhWzlZWKup3G3P6UW2ZCGZCcEYIPMU81uJGZlx7lodvGw1IRkN18jW1bIyXGHjYBtR9kHYbildRCTGo5woJxtiixJgKxzkDYmoTyiMO9y6wIoJZugHPJrJLppaICERxlXO5GxFRZ9Z7sIOY5dKsLcWz67drmMmIgyAcxnl86w7ztRwGyuTD977wd3rLxjWDvjTz57VSa+iafw0jbaTpzn9tLudBGR7sVzHFO3VrF/6fE8ukN43TAbYgbe/B9wrMXtxdrwSzHciS+1k3DEADSH6erKKpTJ1O87lAhZj8uVQt41BDSJ4RzAHOvOJ/tH4nH30X3OBAxGhmGWTff5gVqTfaNafxYwW7aXjb7wp/RbbTj8ar4T9OyZnDnQFA6HTUZJJ3RkypBPlg1y3DPtC4ZMYUvIZbdmOl22Krtz92aFe9vbF7SdrRGSVCmgOudQPtfLGKriJOxtbuSABeYByDRO679VjZkjQtqYE+nOsPhXaThPEbK3uFmWOSSQQlHG4f6etWBxO3biM9gzqkkZULnYtkZ/ZU1FvhVvxllogr+Eg79DtRY4iRhgN9qzb/iNrY6O+lzrJAC78udZh7VWo1r3U+M4wSBn1pTywjxsSi/aOleGGPaRlDf0cHeq7XAC6VjLDJxq5cv8AWsu24/wu55zFNv0xjNVr7tNY28HeQI8zhyDGowcD301kxv6DUv4dJeR2kdkstu0jXTAePVgr0IIrOCu74nkkZM7+I5ArKi7WcMe7eGQMiBgFbGegO/zqV12r4ZDP3cQabAUswyoGSQeflj8aqM4JMUoybN2EmBlFvIQOobcH3UDjPGpeFW5ebfL6RpXNcnx25ee8S64fePumqMLJjQccv9qy5Lm8vFLXc0jnC6tT5GVXHL4VzzzJeG0YOzq7ztdY6EaS4ZkZiMAY3GDy+PzFWou0vDeJ2Rma8jzbkZMoCnSR674/fpXlU9q5k1a8tI2xFWobDwMTFGxOAC++R7qt5klbIcG+Hp8d/aRusiXcOpnaNfHzYZyPwrQdIZm7rvIhcKupgcl1Xlv6V4ylobdI1lijyrHLEZz6ir9vPMiyNHczLOcKZFffAPIUSz/UhrF8PTUiKN4HOR1U1YW5mjXGoH1NeW3HEuKW/ePb8SkRZD3r94ebjGD8cD5VKLjPGLaK2lS6EyWoJ8TZLA7YOee1X+sJLwh45RPS5JJM5eQjPLxYpq8nm4/xO5ULLM7YdnG521HJGfLyHSmrTaBOsj2GHjPCGxJDxC1BZtIQyA9CevuNL8o+G5BfiVsYw+nAkAGoZP7DXkGEMaHqwzuRQJAcgIucsFwPrWKnjk6NXGUVZ7Z+U3ArUPK3EIWOCcKQTjY9PeP3FYfGftB4bboj2olm1MylFGCMbZJPnkY9K8vZpIcIV0Eg7Y6edQEXfKS4OkDlmqWOPpO78PTrf7S7DudcguFIUal2JyeePwp37fcMJkeG3nlGjbUMZbGeXSvJ0QmUgDKrtvVuDvAhVVOw54ONqTgl1ApNnZS/aDfNNC1mkUUY3kRlyCeXy2z8aFcdr+KGJwl7pYRlDoUDWfP3+6uPMT95IgALEZIB6UZrORIi7Lsi5DZyDVOMeBcmWrbtRx22tkhh4lN3a4IB3Iwcjf4VTu+LcTu0H3q+nlwmjxOdwTnFVS/hAIwdNLUSgwvXJpqKsVsKlzchHAmkBl0iTxe1jln3VBWkTTpzz6UN30rk7HypluPkMUOhKy330irz5dKZZpWbUpPp6/vmhPeugLDGWI2x0qFzc6mPdjAI2xUpL+DDujSsC6nLcgRT/dotIZVI6H31Ua5kLDUen40wnYgEsef+tN2AcIoyQM45Z61MCIxtkEsc755VWSRu5ZmJIUnApMdJUr7Ox386H0EaUHEO4hZe7Uf0MVIcThE/3qdZTLsNpDjOOdYzS/mlGeW+aNFbT3Wru1zp3GTzrNwj6UpPw1G4t3sTKiMBkkYJOMn1oE14XLFCcFQccsY51C0s5Y0Yah3mD4SMirlrwrv4Ve5kMQOwC4yazf5Q6y6yS8Kv3gtpaNiPPNWJpYUgBSTW3U9KuNwy00jutTlRyc8/fipR2lsMuYEwOQXzzWby430uOOZnRXihHLgAkbM1PHf20QkeWMmQMF3HP1qxf3lvDcNC8Ks66coRkEEb5/Z8KrxWi3tvJKiqSFxJnmMf7U7TVtUg75ZKDiIa6lSUsFQZ94zvVmG+h0GVnA7wuAOoAzvUYbZbZnuZIzq0YB6b/wDasyB4e/Luw3DHTjwr51OkZPhVtemhA0VxNaSHwxSMw38x51du5UjQpFgaRkjG43rEhudErRhVaMkMPQjFaNvbSXF5FdqyxYO4O5b4VnlSTuTpDiytLLIIw0q4QNgswpoIy9/3UjqjKMkk5H770uIWd9LJ3MzYjeQkN5fCow8GljuI1++Ydufov15bVopRUPSHd+F+9QTS91HKFbGw8wKp3kdtGRaxyd2UOGYuTkH9zS4hZTT3ym0lJZEALMMYx1NVEtJlmM92FZJDq2OcH1ohVXYN38LqWrWoCyzIikeE49rzpqyr64eQopkJ05xn30q1UZvrZOyXKFbXqiDu9TeE7n3+lbVvdQG312rEkHS4Ixn98Vyuk4J1E451K2mlhcHxY8sVE8Sl0IzaOuW9geOXXJlBhcaR8hQ5sJblrJNes4I58jy9Kxu+XThRqGNhncetXuGzSGEpGx1EeeB6Vkk8fUVal6EspVhgZZE1Op3K/hmo2U80paVpNCxKWyD7W+aDK0oysnhYkHUff5VETRpcSw2fsmPRhh1Jz57b1rKbaJpJlhLObirNd61Axl1B3BPL8Kt29lILYxz3SxjAJTGaFa3P3dFYMVX2W3OM53IHx/CrF7MLqIiOcd4dkYnfFYPLO6+FqMaOdnyC4JyQSM0BXLHTnc7itv7g1yFaVlj0sQVC7HA+tEe1ituGx6kUSSkMeunyHyrrWeK4Zfm2ZBjdlwBvjnVm34VNPATkD+jnYsfSpyW7sVEAfxEDVjOBUuLu8BjMbkhcY3zim5tukJRrrKXdqsmJAQR+jSQAoJW5AZ0+eOlMlwG1GQZwu3vqDyIWVTsB0+Fad8J4GvIF1d5EcDGQM5znyqk4MZCt0rUtolZ0DnMKe1n1p723jk8JU95nYjr6Ulkp0xuDaszo5cAjz/GiM4eFl8qsz2Cwqq+LV7WDQltRnDtpOckU94voqZQHjZVJ5nFb1urFVWJCQDk4oaQx29soXQSwL+IeIirdvP3sKhEZCRgqfdWeSey4aY416CS90OcndfCR5Gp3HEi0brj2OWOozVRLN3V5dJyZNqhf2rRsM5z1PQ1GsHVlOU0g0HEJAyF0xGxIJOwNSt+LOsmCB3aE7Hqc86jdKg4XAiIcjByT1PWmktIu9R5cJCQNhscD0pNQfqFcjPuLgzXEsjbaztjlVqxkY8PuAgbUfxFQuIfz7iMaE05UbcjQ7TwQSEHckDbkK1aTjRCbUrZrWdy0tiy68ugIOegrFlbc6DTxTmOKRF/SxmhzOrFdI3I3ohDVhKWyJW83dtG53AzqHpXWwXixxZQEbgD02rkrPSHGtNeCDgnbGffWneXjdycjDMfCwPIVnmgptKi8UtV01pZEQyTmTMSjJ99SLxmENnVncaTz/fasuBo54SX8SN0JzmrDd0FxGTjGM8q5njS4dG1h1m3EbY0Psx60HvI1DYBI89O1DjXJTLaXzzPQUax7tjcGYqXV8LnljFGiXRGPdx65NaqoyTmlW0vDoXJkd3j1bhR0FKtVnSVGf5WcpACFBOw8871FnLSAE7Z23qD6gAC2fIeVRZToB8+VbpdMrDCTxqU2JPnWikgWIeznqN9qzbdvziAbZ2NEaTLk5znz5VMo2FhZbhwdLg8/PlRLeVlDOkgTIIbbnnkM9TVaRGOliANutDJZIzvszU1FVQmy804D6Hck6tw+c+6rSyGGbWoJGeu1YerScqc4645VoJcM6DUxO/KlLHQ4yNiSc7KCAM5O9Q4hOrRx649IwBQLcNNLGMEj9IedV7oSLK4WGTB6lDt+FTGCtFtui4t93YzHq0jbHrVW7WW5KBVJ1DICiq4fQxTVqB/H0rYW+UW66VC4GOW9VJaO0SnsqZirBIoLckqKwsXQzqyhxlWxzq3JcIZ5NC+AkbMOlE4jxAyuBqBQclxsBWm8r8I1QjM8aqWXUPPTsatQyd5ca33xuq45HHOq11esbeGCJsRhBnyJo8kqGFMbPjJI/SrJ2aJgr+RtWsN4xgaj5VKyuV7nVKikoPaI3FAuZwY10GgzT/xXC4yTg+lUo2qE5ds2mmSeXV3eWC6V0ilNNEHAGchd+lZXDplRPFg+mKmlxGxIYkNg42qHDtFbou21zASUbIOvrRbiSOYKiKO8A3bOwHWqcJt8yMT4t9vfTKimO4lJCgY0qOtS4q7G5Wg0TwyQFJFKtGdOV6YodwkTxRlQWxswY7kjrULGRGUJICvXy3qSyhxhkwqsQT586dUxNpgGYNoCqAeWNXpVR8xd4oDLluR6+6tBbcNgkA5Y4+VK9g0Iuy7DOdjj31pGSJcXRkMGDt1HmKiDsN/EDR+7UvpQ7EZqE6KjxaQTlc+h+NbWjKghy8qMVxvuBRbuQMqjOy1GJmEOSFAB86EUYkgYwR51NdKvhdhlIjU5wANgKP3o06tR88bYqha4kJUhtvLyq2phTUNB26f61jNdNI+FvvlaFACNQyCaFFJ3DmNcaXHPnQ0ljAwDjH6WNwaJLJC6r4zqHLNTRoEN3KpILZxt7qVDkeIHUuTqJ28qVTSC2YSgruRv5VGQ6VAAwCSaKkDFkaZ2VWODIFJx9an3cTBMPJIcNqAQ7H9Hnz6VvZlTKIOMj0oqkmPGMihFCM6gVPkRTsxJHdIV23yedXaIaYaJCHXwgA786lImR4F9rfc10Vg3Zv7rAt9aX33kRESd1ghn2wRlvLNJrbgIUqLfiTM0nhwijSu2R7W5qG0h02c2ttKRgIfmPrR4bK76Rbf31+tdA69loGKvw7jDMQRvoO/+akkXZthkWvF19MR/WhzJpkeB8Nv2uA7QeDG35xNz862biyv5AQnDAw6/nE+tZ0cfZ9HDLBxQeraPrUpV7PABpLfiZyeYZRisuORrvJKgDdn+KtISOEqQeodf+qjt2a4uyLnhhyP7S/Wof+HF3W14r8XSjNd8CCqO44jj/EX6Vcn/AAhNlZezHGtWr+CXwOoK/Wnl7M8a3A4RIT6Y+tJrrs8S5S04lqz/AFhR+yh3F5wiYjure9B9bgbf/mq2Ygv5NcajiVf4KnORzAH1qZ7NcWSHR9wuSMdelVJrm3KqIxOCNv5T/amEpY4V3G3Vs1Dkykgh7OcXTBHDZzsQcrQ5uA8VMbP/AAbKCTy00G5dgu8rZ95qMJZ4SNbH401Mmg0XZ/iQHjspkJ6YqP5O8R172cwAokQYDcn507gqwx1Wl+rsrQeDs/fkN/FZPLlRz2e4h93lVrOUlsY2FVLcuSwyANXU0SRWUHU4w2OtQ5ux60FTgPEpIyr2MwHnUU7OcQRsmzl9o48Q5Y99AhysbEOCM7bmmlZUjU95uScU93YUXzwu8UqGt5FOrfx/2cedCu7CcIrLbMSvngisppBlSW69fdQpJlbYEAA+dNKwc3Qee1lZ9TwADbkAKBLHp0hYwRzOT1quZV1HxD51EygnJcfOtkzGywYFdCSMHPICnEQiYMVz76gkqkgKw59DU52ODh6WzKL1ldMmR3ERHQ6KI0pbVmKNens1ShYhB4jVhXcofExrJ+mqfCLxd4FOhBpP9HnRHVtIGiD4JTpr0rsx3O2Kf89rGlJMdfCaVsfBboAAiHn0pU8nfBj4JOZ/RNKp6Fo2G7C3jRR4ni1cj4aJa9hb5CubtB1PgzXpAACDakvOroz2Z51J9nd1cS65b8EnGo6ADVxfsvt+78XFpgx6CFMV3nUVJztVkts4Bfs5jWRXF+4cYy3dLzq/H9n8ZwW4tKGG4xAn0rrM1LJxSaT9BTkvDj5fs2sZXLvxO5U+SRoookf2dcOQY/hG8+S11RJ86cE+dFIWzOZXsDw9dhf3ePcv0qUnYTh7qM315t5afpXS5NRyfOjVfwe8jnPyE4YMfxy8PxX6VB/s/wCEv7V1efBlH7K6fJpZNFIWzOWX7OuCqf8AzN6c/wBtfpTj7POBD+evf1g/6a6jJpsmqsDnx2E4IP5y8/WD6VIdiOCKc5uyf8UfSt7JpiTmkOzDfsRwFzl1uif8b/anj7FcBQeFbr9ca3M0qVBbMc9juBE57u45Y/l2qX5JcBwM20xI87h/rWtk02TSpD2ZmR9lOz6AgWJO+d5pD/zVM9meAH2uGo3953P7a0RSNOkGzM8dm+AKAo4VBj4/WiLwHgabpwu3B/u1bpsmikFsCOE8JHLh0H+SpDhnCxy4fb/qxRMmlk0CIDhvCwNuHWw/+sU/8H8N/qFt+rFTFKgREWHDwMCyt8f4YpvuHD/6lb/qxU6VAyIs7If+0h+CCpLb2q+zbxD/AOIpU9ADCK3/AOCn+Spd1B/wU+VMGPnTjnTAi0EJ/m1+VKptSoA//9k="
                                                    height="160px"
                                                    width="60%"
                                                    roundedCircle
                                                />
                                                <div className="paragraph">
                                                    <p>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                                </div>
                                            </div>

                                        </Col>
                                        <Col lg={8}>
                                            <div className="message text-center">

                                                <Image
                                                    src="data:image/jpeg;base64,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"
                                                    height="160px"
                                                    width="60%"
                                                    roundedCircle
                                                />
                                                <div className="paragraph">
                                                    <p>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                                </div>
                                            </div>

                                        </Col>
                                        <Col lg={8}>
                                            <div className="message text-center">

                                                <Image
                                                    src="data:image/jpeg;base64,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"
                                                    height="160px"
                                                    width="60%"
                                                    roundedCircle
                                                />
                                                <div className="paragraph">
                                                    <p>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                                </div>
                                            </div>

                                        </Col>

                                    </CarouselSlide>
                                </Col>
                            </Row>
                        </Container>
                    </TestimonialsStyle>
                </Col>
                <Col lg={12}>
                    <FAQStyle>
                        <Container fluid={true}>
                            <Row>
                                
                                <Col lg={12} >
                                    <div style={{textAlign: 'center', width: "80%", margin: "0 auto"}}>
                                    <h3>How Does It Work?</h3>
                                    <h5>WE HAVE A NETWORK MARKETING PROGRAM AND IT IS STRICTLY MEMBERSHIP BASED,<br/> $30 IS THE MEMBERSHIP FEE</h5>
                                    <h6>STAGE 1</h6>
                                    <p> IS THE FEEDER BOARD OF A 2 BY 2 MATRIX </p>
                                    <Image
                                        src={Stage1}
                                        height="160px"
                                        width="150px"
                                        rounded
                                    />
                                    <h6>STAGES 2 TO 5 ARE ALL 2 BY 5 MATRIX SYSTEM</h6>
                                    <Image
                                        src={Stage2}
                                        height="160px"
                                        width="150px"
                                        rounded
                                    />
                                    <p>MEMBERS ARE EXITED FROM THE PROGRAMME AFTER COMPLETING STAGE 5, <br/>
                                                        AFTER BEING AWARDED WITH A BRAND NEW FOUR BEDROOM DUPLEX AND $12,000.</p>
                                                        </div>
                                </Col>
                                <Col lg={6}>
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Card.Header>
                                                <h3>Frequently Asked Questions</h3>
                                            </Card.Header>
                                            {/* <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="0">


                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                </Card.Body>
                                            </Accordion.Collapse> */}
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    <h3>How Do I Pay?</h3>

                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>
                                                    <p>BUY THE EQUIVALENT OF $30 FROM YOUR SPONSOR AND USE IT IN COMPLETING YOUR REGISTRATION.</p>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                    <h3>How Do I Earn?</h3>

                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>
                                                    <p>MEMBERS EARN IN FOUR MAJOR WAYS</p>
                                                    <ul>
                                                        <li><b>REFERRAL BONUS</b>: Members earns 20% of signup fee as referral bonus for all personal referrals. i.e. $6</li>
                                                        <li><b>MATRIX BONUS</b>: Members earns matrix bonus each time they advance to a new stage. Matrix bonus for completing stage 1 is $10, stage 2 is $1000, stage 3 is $3000, stage 4 is $6000, and stage 5 is $12000.</li>
                                                        <li><b>MATCHING BONUS</b>: A matching bonus of 10% is paid to a member each time a personally enrolled member earns a matrix bonus.</li>
                                                        <li><b>AWARD /INCENTIVES</b>:  A MEMBER GETS A LAPTOP/IPAD ON COMPLETING STAGE 2. A BRAND NEW CAR ON COMPLETING STAGE 3. AN SUV ON COMPLETING STAGE 4. A BRAND NEW DUPLEX ON COMPLETING STAGE 5.</li>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                                    <h3>What Benefits Do I get?</h3>

                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="3">
                                                <Card.Body>
                                                    <ul>
                                                        <li>STAGE 1:  Matrix bonus of $10</li>
                                                        <li>STAGE 2: Matrix bonus of $1000 and Laptop/IPad.</li>
                                                        <li>STAGE 3: Matrix bonus of $3000 and a brand new car.</li>
                                                        <li>STAGE 4: Matrix bonus of $6000 and a brand new SUV.</li>
                                                        <li>STAGE 5: Matrix bonus of $12,000 and a brand new 4 bedroom Duplex.</li>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Col>
                                <Col lg={6}>
                                    <div className="fb-page" data-href="https://www.facebook.com/106039834393060" data-tabs="timeline" data-width="700" data-height="700" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/106039834393060" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/106039834393060">Integration Test</a></blockquote></div>
                                    {/* <script src="https://apps.elfsight.com/p/platform.js" defer></script> */}
                                    {/* <div class="elfsight-app-f88584af-5a2a-4116-95cf-d75c816214e6"></div> */}
                                    {/* <div class="fb-post" data-href="https://www.facebook.com/20531316728/posts/10154009990506729/" data-width="500" data-show-text="false"><blockquote cite="https://developers.facebook.com/20531316728/posts/10154009990506729/" class="fb-xfbml-parse-ignore">Posted by <a href="https://www.facebook.com/facebookapp/">Facebook App</a> on&nbsp;<a href="https://developers.facebook.com/20531316728/posts/10154009990506729/">Thursday, August 27, 2015</a></blockquote></div> */}
                                    {facebookPosts.data.length < 1 ? (null) : (

                                        <>
                                            {facebookPosts.data.map((post, i) => (
                                                <Fragment key={i}>
                                                    {/* <p>{parse(post.message)}</p> */}
                                                    {/* <p>{(post.message)}</p>

                                            <p>{post.created_time}</p> */}
                                                    {/* <iframe src={`https://facebook.com/${post.id}&output=embed`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen frameborder="0"></iframe> */}
                                                    {/* <div className="fb-page" data-href={`https://facebook.com/${post.id}`} data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                                                        <blockquote cite={`https://facebook.com/${post.id}`} className="fb-xfbml-parse-ignore">
                                                            <a href={`https://facebook.com/${post.id}`}>Facebook</a></blockquote>
                                                        </div> */}
                                                    {/* <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fbarrackoyog%2Fposts%2F10211594047605571&width=500" width="500" height="594" style={{border:"none" , overflow:"hidden"}} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe> */}
                                                    {/* <iframe src={`https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com${post.id}`} width="500" height="594" style={{border:"none" , overflow:"hidden"}} scrolling="no" frameBorder="0"  allow="encrypted-media"></iframe> */}

                                                    {/* <div className="fb-post" data-href={`https://www.facebook.com/${post.id}`} data-width="500" data-show-text="true"></div> */}
                                                </Fragment>
                                            ))}
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </FAQStyle>
                </Col>
                <Col lg={12}>
                    <FooterStyle id="contact">
                        <Container fluid={true}>
                            <Row>
                                <Col lg={3} md={3} sm={6} xs={6}>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col lg={4} md={4} sm={4}>
                                                <Image
                                                    width="100px"
                                                    src={Logo}
                                                    roundedCircle
                                                // fluid
                                                />
                                            </Col>
                                            <Col lg={8} md={8} sm={8}>
                                                <div>
                                                    {"\u00a9"} Right Step Foundation
                                                </div>
                                                <div style={{ textAlign: "right" }} className="socialIcons">
                                                    <a href="https://www.twitter.com" target="_blank">
                                                        <Icon icon={twitter} size={"50px"} style={{ color: '#00acee' }} />
                                                    </a>
                                                    <a href="https://www.facebook.com" target="_blank">
                                                        <Icon icon={facebook} size={"50px"} style={{ color: '#3b5998' }} />
                                                    </a>

                                                    <a href="https://www.instagram.com" target="_blank">
                                                        <Icon icon={instagram} size={"50px"} style={{ color: '#E1306C' }} />
                                                    </a>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={6}>
                                    <h5>Quick Links</h5>
                                    <h6><a href="#about"> About </a></h6>
                                    <h6><a href="#courses"> Courses</a></h6>
                                    <h6><a href="#register"> Earn With Us</a></h6>
                                    <h6><a href="#contact"> FaQs</a></h6>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={6}>
                                    <h5>Contact</h5>
                                    <h6>
                                        {/* <a href="mailto:">ayo@webpage.com.ng</a> */}
                                            Right Steps Foundation.



                                        </h6>
                                    <h6>
                                        The Box Office Hub.
                                        Discovery Mall, Plot 215 Konoko Crescent, Wuse 2,
                                        Abuja.
                                        </h6>
                                    <h6>
                                        <a href="tel:+2347033975607">08060025724</a>
                                    </h6>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={6}>
                                    <Col>
                                        <a href="/signin">

                                            <Button>Sign In</Button>
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="/signup">
                                            <Button>Sign Up</Button>
                                        </a>
                                    </Col>
                                </Col>
                            </Row>
                        </Container>
                    </FooterStyle>
                </Col>
            </Contain>
        </Fragment>
    )
}

export default Landing;