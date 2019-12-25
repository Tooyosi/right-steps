import React, { Fragment, useState, useContext } from 'react'
import {withRouter} from 'react-router-dom'
import { RegisterFormStyle } from '../styles/style'
import { Icon } from 'react-icons-kit'
import { longArrowRight } from 'react-icons-kit/fa/longArrowRight'
import { Spinner, Row, Col, Nav, Button, Carousel, Image, Navbar, Form, Accordion, Card } from 'react-bootstrap';
import WebService from '../globals/WebService';
import { ErrorContext } from '../Context/Context';
import ErrorDisplay from '../globals/Error';
import { LOGIN } from '../globals/links';

const SignInForm = (props) => {
    const [username, updateUsername] = useState('')
    const [password, updatePassword] = useState('')
    const [loading, updateLoading] = useState(false)
    const [error, setError] = useContext(ErrorContext);

    let service = new WebService()
    const submitForm = async ({ target }) => {
        let { id } = target
        switch (id) {
            case "Submit":
                // submit the form
                if (username.trim() == "" || password.trim() == "") {
                    setError({
                        show: true,
                        isError: true,
                        message: "One or more credentials missing"
                    })
                } else {
                    setError({
                        show: false,
                        isError: false,
                        message: ""
                    })
                    updateLoading(true)
                    let result = await service.sendPost(LOGIN, {
                        username,
                        password
                    })
                    if (result.status == 200){
                        let {data} = result;
                        props.history.push("/dashboard")
                    }else {
                        setError({
                            show: true,
                            isError: true,
                            message: result.response.data
                        })
                        updateLoading(false)
                    }
                }
                break;
            default:
                break;
        }
    }

    const handleChange = ({ target }) => {
        let { name, value } = target;
        switch (name) {
            case "name":
                updateUsername(value)
                break;
            case "password":
                updatePassword(value)
                break;
            default:
                break;
        }
    }
    return (

        <RegisterFormStyle>
            <Form>
                <Row>
                    <Col lg={12}>
                        {error.show ? (
                            <ErrorDisplay message={error.message} error={error.isError} />
                        ) : null}
                    </Col>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={handleChange} placeholder="Name" name="name" />
                        </Form.Group>
                    </Col>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password" />
                        </Form.Group>
                        <a href="" style={{ float: "right" }}>forgot password ?</a>
                    </Col>



                </Row>
                <Row>
                    <Col className="text-center">
                        <Button onClick={submitForm} id="Submit">
                            {loading ? (
                                <>
                                    <Spinner animation="grow" role="status"/>
                                        <span style={{ marginRight: "5px" }}>
                                            Loading ....
                                         </span>
                                </>
                            ) : (
                                    <>
                                        <span style={{ marginRight: "5px" }} onClick={submitForm} id="Submit">
                                            LOG IN
                                         </span>
                                         <Icon size={'15px'} icon={longArrowRight} onClick={submitForm} id="Submit" />
                                    </>

                                )}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </RegisterFormStyle>
    )
}

export default withRouter(SignInForm)