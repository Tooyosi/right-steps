import React, { Fragment, useState } from 'react'
import { RegisterFormStyle } from '../styles/style'
import { Icon } from 'react-icons-kit'
import { longArrowRight } from 'react-icons-kit/fa/longArrowRight'
import { Container, Row, Col, Nav, Button, Carousel, Image, Navbar, Form, Accordion, Card } from 'react-bootstrap';

export const SignInForm = () => {
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
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <a href="" style={{float: "right"}}>forgot password ?</a>
                    </Col>



                </Row>
                <Row>
                    <Col className="text-center">
                        <Button onClick={submitForm} id="Next">
                            <span style={{ marginRight: "5px" }} onClick={submitForm} id="Next">
                                LOG IN
                                </span>
                            <Icon size={'15px'} icon={longArrowRight} onClick={submitForm} id="Next" />
                        </Button>
                    </Col>
                </Row>
            </Form>
        </RegisterFormStyle>
    )
}