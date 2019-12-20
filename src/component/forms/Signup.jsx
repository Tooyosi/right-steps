import React, { Fragment, useState } from 'react'
import { RegisterFormStyle } from '../styles/style'
import { Icon } from 'react-icons-kit'
import {longArrowRight} from 'react-icons-kit/fa/longArrowRight'
import {longArrowLeft} from 'react-icons-kit/fa/longArrowLeft'
import { Container, Row, Col, Nav, Button, Carousel, Image, Navbar, Form, Accordion, Card } from 'react-bootstrap';

export const SignupForm = () => {
    const [formState, updateFormState] = useState(1)

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
    return (

        <RegisterFormStyle>
            <Form>
                <Row style={{ display: formState == 1 ? "flex" : "none" }}>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" />
                        </Form.Group>
                    </Col>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email address here" />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select">
                                <option defaultValue>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control as="select">
                                <option defaultValue>Select Nationality</option>
                                <option>Nigerian</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>State Of Origin</Form.Label>
                            <Form.Control as="select">
                                <option defaultValue>Select State</option>
                                <option>Nigerian</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={{ display: formState == 2 ? "inherit" : "none" }}>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="username" />
                        </Form.Group>
                    </Col>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Set password" />
                        </Form.Group>
                    </Col>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" />
                        </Form.Group>
                    </Col>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Sponsor ID</Form.Label>
                            <Form.Control type="text" placeholder="Sponsor ID" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>

                    <Col>
                        {formState == 1 ? (
                            <Button style={{ float: "right" }} onClick={submitForm} id="Next">
                                <span style={{ marginRight: "5px" }} onClick={submitForm} id="Next">
                                    Next
                    </span>
                                <Icon size={'15px'} icon={longArrowRight} onClick={submitForm} id="Next" />
                            </Button>

                        ) : (
                                <>
                                    <Button onClick={submitForm} id="Back">
                                        <Icon size={'15px'} icon={longArrowLeft} onClick={submitForm} id="Back" />
                                        <span style={{ marginLeft: "5px" }} onClick={submitForm} id="Back">
                                            Back
                </span>
                                    </Button>
                                    <Button style={{ float: "right" }} onClick={submitForm} id="Submit">Submit</Button>
                                </>
                            )}
                    </Col>
                </Row>
            </Form>
        </RegisterFormStyle>
    )
}