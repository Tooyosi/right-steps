import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Nav, Button,  Carousel, Image, Navbar, Form,  Accordion, Card } from 'react-bootstrap';
import CarouselSlide from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Contain, NavStyle, CarouselStyle, AboutStyle, CoursesStyle, RegisterStyle, RegisterFormStyle, TestimonialsStyle, FAQStyle, FooterStyle} from './component/styles/style.jsx'
import { SignupForm } from './component/forms/Signup.jsx';
import Logo from './../assets/logo.png'
import Slide1 from './../assets/administration.png'
import About1 from './../assets/about1.png'
import Courses1 from './../assets/courses1.png'
import Courses2 from './../assets/courses2.png'
import Courses3 from './../assets/courses3.png'
import Courses4 from './../assets/courses4.png'


const Landing = () => {
    const [about, updateAbout] = useState(1)
    const [formState, updateFormState] = useState(1)
    const submitForm = ({target})=>{
        let {id} = target
        switch(id){
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
    return (
        <Fragment>
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
                                        src={Slide1}
                                        alt="Third slide"
                                    />

                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={Slide1}
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
                                            <Col className="details" style={{display: about==1? "block" : "none"}} lg={12}>
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
                                                                <p>
                                                                MATRIX BONUS IS EARNED AFTER A STAGE IS COMPLETED. I.E, 
                                                                WHEN YOU COMPLETE STAGE 1, YOU GET A MATRIX BONUS OF #10, 
                                                                I,E #3,500. STAGE 2, YOU GET $1,000 I.E #350,000. STAGE 3, 
                                                                $3,000 I.E #1,050,000. STAGE 4, $6,000 I.E #2,100,000. 
                                                                STAGE 5 PAYS $12,000 I.E #4,200,000
                                                                </p>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Button>Learn More</Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                </Row>
                                            </Col>
                                            <Col className="details" style={{display: about==2? "block" : "none"}} lg={12}>
                                                <Row>
                                                    <Col lg={6} md={6} sm={6}>
                                                        <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKC
                                                        gkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQw
                                                        NGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//
                                                        AABEIAHsA6gMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAEIQAAEDAgICDggFAQkAAAAAAAABAgMEEQUSITEGExQWQVFSV
                                                        WFxkZSx0TIzNlNzdJPBIkJygdJiFSMkNDVERYKS/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC
                                                        8RAQABAwIDCAIBBAMAAAAAAAABAgMRElEEEzEUISIyQVKRoQUzwWFxgfAGFSP/2gAMAwEAAhEDEQA/AIh1
                                                        uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBIEAAJAAQAAAAJAAAAAAAAAAIAASAAAq2S
                                                        4HYLsTw2JkW6MUnZI+Nr1akF0S6XKRVVPSE1zbonEyxvXwfneo7sT49leba3+jevg/O9R3YePY5trf6N6+D87
                                                        1Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jevg/O9R3YePY5trf6N6+D871Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jev
                                                        g/O9R3YePY5trf6N6+D871Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jevg/O9R3YePY5trf6N6+D871Hdh49jm2t/o3
                                                        r4PzvUd2Hj2Oba3+mW7FsIcqImL1F1W3+WIzVsRctTPX6c5jVCmG4pUUTXrIkLsqOVLX0FqZzGV6oxOEIlUAAAA
                                                        AAQBIAAAAAAd6K9QH0XFPWU3ysXgVt9GHE/sQjRzgAAAAAAKrFFnkxGmp4aqSnYsMkirHbS5FaiXui3TSvacfF3q7URNL2Px
                                                        HB2+KqrpubPGLGZaVyx4lGj426qqnYqtXpczW39rp1FLPH0V9090teM/A8RYjXb8Ufa4hljmiZLC9skb0u17Vuip0Kd0PDmJjuluSgA
                                                        AbxetZ+pPEieiaesOd2Ye02IfF+yFKPLD0a/NKmLKAAAAAAAAAAAAAADvRXqA+i4p6ym+Vi8Ctvow4n9iEaOcAiVNfG2pioKaSGXEZ3tZDTbY
                                                        iOVV4V4UaiIqqvEilKq4iGtq1NyrHou37EsTbTbZFjLZKpEvtb6ZqQuXi5SJ03X9zHm1O3slvCjocSpqtXRNkjbUxqrZqfbEV8TkWyoqdaaz
                                                        emqJhwV25onEphZQA57ZDUx0uLUjppEja6mkTTrd+JlkTjXoPN/I01VRTFL6X/jly3bruV3JxERDSnpK+v0tatDT+8kbeV3U3U3/t2GFj8bPW
                                                        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
                                                        1adWpCYjCJnKKSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=" 
                                                        rounded
                                                        width="100%"
                                                        fluid
                                                        />
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                                                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                                                                    officia deserunt mollit anim id est laborum.
                                                                </p>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Button>Learn More</Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                </Row>
                                            </Col>
                                            <Col className="details" style={{display: about==3? "block" : "none"}} lg={12}>
                                                <Row>
                                                    <Col lg={6} md={6} sm={6}>
                                                        <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKC
                                                        gkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQw
                                                        NGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//
                                                        AABEIAHsA6gMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAEIQAAEDAgICDggFAQkAAAAAAAABAgMEEQUSITEGExQWQVFSV
                                                        WFxkZSx0TIzNlNzdJPBIkJygdJiFSMkNDVERYKS/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC
                                                        8RAQABAwIDCAIBBAMAAAAAAAABAgMRElEEEzEUISIyQVKRoQUzwWFxgfAGFSP/2gAMAwEAAhEDEQA/AIh1
                                                        uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBIEAAJAAQAAAAJAAAAAAAAAAIAASAAAq2S
                                                        4HYLsTw2JkW6MUnZI+Nr1akF0S6XKRVVPSE1zbonEyxvXwfneo7sT49leba3+jevg/O9R3YePY5trf6N6+D87
                                                        1Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jevg/O9R3YePY5trf6N6+D871Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jev
                                                        g/O9R3YePY5trf6N6+D871Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jevg/O9R3YePY5trf6N6+D871Hdh49jm2t/o3
                                                        r4PzvUd2Hj2Oba3+mW7FsIcqImL1F1W3+WIzVsRctTPX6c5jVCmG4pUUTXrIkLsqOVLX0FqZzGV6oxOEIlUAAAA
                                                        AAQBIAAAAAAd6K9QH0XFPWU3ysXgVt9GHE/sQjRzgAAAAAAKrFFnkxGmp4aqSnYsMkirHbS5FaiXui3TSvacfF3q7URNL2Px
                                                        HB2+KqrpubPGLGZaVyx4lGj426qqnYqtXpczW39rp1FLPH0V9090teM/A8RYjXb8Ufa4hljmiZLC9skb0u17Vuip0Kd0PDmJjuluSgA
                                                        AbxetZ+pPEieiaesOd2Ye02IfF+yFKPLD0a/NKmLKAAAAAAAAAAAAAADvRXqA+i4p6ym+Vi8Ctvow4n9iEaOcAiVNfG2pioKaSGXEZ3tZDTbY
                                                        iOVV4V4UaiIqqvEilKq4iGtq1NyrHou37EsTbTbZFjLZKpEvtb6ZqQuXi5SJ03X9zHm1O3slvCjocSpqtXRNkjbUxqrZqfbEV8TkWyoqdaaz
                                                        emqJhwV25onEphZQA57ZDUx0uLUjppEja6mkTTrd+JlkTjXoPN/I01VRTFL6X/jly3bruV3JxERDSnpK+v0tatDT+8kbeV3U3U3/t2GFj8bPW
                                                        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
                                                        1adWpCYjCJnKKSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=" 
                                                        rounded
                                                        width="100%"
                                                        fluid
                                                        />
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                                                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                                                                    officia deserunt mollit anim id est laborum.
                                                                </p>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Button>Learn More</Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                </Row>
                                            </Col>
                                            <Col className="details" style={{display: about==4? "block" : "none"}} lg={12}>
                                                <Row>
                                                    <Col lg={6} md={6} sm={6}>
                                                        <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKC
                                                        gkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQw
                                                        NGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//
                                                        AABEIAHsA6gMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAEIQAAEDAgICDggFAQkAAAAAAAABAgMEEQUSITEGExQWQVFSV
                                                        WFxkZSx0TIzNlNzdJPBIkJygdJiFSMkNDVERYKS/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC
                                                        8RAQABAwIDCAIBBAMAAAAAAAABAgMRElEEEzEUISIyQVKRoQUzwWFxgfAGFSP/2gAMAwEAAhEDEQA/AIh1
                                                        uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBIEAAJAAQAAAAJAAAAAAAAAAIAASAAAq2S
                                                        4HYLsTw2JkW6MUnZI+Nr1akF0S6XKRVVPSE1zbonEyxvXwfneo7sT49leba3+jevg/O9R3YePY5trf6N6+D87
                                                        1Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jevg/O9R3YePY5trf6N6+D871Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jev
                                                        g/O9R3YePY5trf6N6+D871Hdh49jm2t/o3r4PzvUd2Hj2Oba3+jevg/O9R3YePY5trf6N6+D871Hdh49jm2t/o3
                                                        r4PzvUd2Hj2Oba3+mW7FsIcqImL1F1W3+WIzVsRctTPX6c5jVCmG4pUUTXrIkLsqOVLX0FqZzGV6oxOEIlUAAAA
                                                        AAQBIAAAAAAd6K9QH0XFPWU3ysXgVt9GHE/sQjRzgAAAAAAKrFFnkxGmp4aqSnYsMkirHbS5FaiXui3TSvacfF3q7URNL2Px
                                                        HB2+KqrpubPGLGZaVyx4lGj426qqnYqtXpczW39rp1FLPH0V9090teM/A8RYjXb8Ufa4hljmiZLC9skb0u17Vuip0Kd0PDmJjuluSgA
                                                        AbxetZ+pPEieiaesOd2Ye02IfF+yFKPLD0a/NKmLKAAAAAAAAAAAAAADvRXqA+i4p6ym+Vi8Ctvow4n9iEaOcAiVNfG2pioKaSGXEZ3tZDTbY
                                                        iOVV4V4UaiIqqvEilKq4iGtq1NyrHou37EsTbTbZFjLZKpEvtb6ZqQuXi5SJ03X9zHm1O3slvCjocSpqtXRNkjbUxqrZqfbEV8TkWyoqdaaz
                                                        emqJhwV25onEphZQA57ZDUx0uLUjppEja6mkTTrd+JlkTjXoPN/I01VRTFL6X/jly3bruV3JxERDSnpK+v0tatDT+8kbeV3U3U3/t2GFj8bPW
                                                        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
                                                        1adWpCYjCJnKKSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=" 
                                                        rounded
                                                        width="100%"
                                                        fluid
                                                        />
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                                                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                                                                    officia deserunt mollit anim id est laborum.
                                                                </p>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Button>Learn More</Button>
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
                                              items: 4,
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

                                              <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                          </Col>
                                      
                                          <Col lg={8}>
                                              <Image 
                                                src={Courses2}
                                                height="160px"
                                                width="90%"
                                                rounded
                                                />

                                              <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                          </Col>
                                          <Col lg={8}>
                                              <Image 
                                                src={Courses3}
                                                height="160px"
                                                width="90%"
                                                rounded
                                                />

                                              <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                          </Col>
                                          <Col lg={8}>
                                              <Image 
                                                src={Courses4}
                                                height="160px"
                                                width="90%"
                                                rounded
                                                />

                                              <p style={{width: "60%", margin: "0px auto", marginTop: "20px"}}>Fixing CSS load order/style.chunk.css incorrect in Nextjs</p>
                                          </Col>
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
                                            <h3>REGISTER WITH US <br/> TODAY</h3>
                                            <div>
                                            <div className="grow">
                                                
                                            <div className="list">   
                                            </div>
                                            <div>
                                                <span className="ball-span col-lg-12">
                                                <span className="col-lg-12 balls"></span>
                                                    <h3>Grow Your Career</h3>
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
                                            <SignupForm/>
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
                                    <Col lg={6}>
                                        <Accordion defaultActiveKey="0">
                                          <Card>
                                          <Card.Header>
                                              <h3>Frequently Asked Questions</h3>
                                          </Card.Header>
                                            <Card.Header>
                                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                              <h3>How Does It Work?</h3>

                                              </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                              <Card.Body>Hello! I'm the body</Card.Body>
                                            </Accordion.Collapse>
                                          </Card>
                                          <Card>
                                            <Card.Header>
                                              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                              <h3>How Do I Pay?</h3>

                                              </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                              <Card.Body>Hello! I'm another body</Card.Body>
                                            </Accordion.Collapse>
                                          </Card>
                                          <Card>
                                            <Card.Header>
                                              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                              <h3>Do i get good quality?</h3>

                                              </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="2">
                                              <Card.Body>Hello! I'm another body</Card.Body>
                                            </Accordion.Collapse>
                                          </Card>
                                          <Card>
                                            <Card.Header>
                                              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                              <h3>What Benefits Do I get?</h3>

                                              </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="3">
                                              <Card.Body>Hello! I'm another body</Card.Body>
                                            </Accordion.Collapse>
                                          </Card>
                                        </Accordion>
                                    </Col>
                                    <Col lg={6}>

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
                                                width="180px"
                                                src={Logo} 
                                                roundedCircle
                                                // fluid
                                                />
                                            </Col>
                                            <Col lg={8} md={8} sm={8}>
                                                {"\u00a9"} Right Step Foundation
                                            </Col>
                                        </Row>
                                        </Container>
                                    </Col>
                                    <Col lg={3} md={3} sm={6} xs={6}>
                                        <h5>Quick Links</h5>
                                        <h6>About</h6>
                                        <h6>Courses</h6>
                                        <h6>Earn With Us</h6>
                                        <h6>FaQs</h6>
                                    </Col>
                                    <Col lg={3} md={3} sm={6} xs={6}>
                                        <h5>Contact</h5>
                                        <h6>
                                            <a href="mailto:">ayo@webpage.com.ng</a>
                                        </h6>
                                        <h6>
                                            <a href="tel:+2347033975607">0703 397 5607</a>
                                        </h6>
                                        <h6>
                                            <a href="tel:+2348100000000">0810 000 0000</a>
                                            
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