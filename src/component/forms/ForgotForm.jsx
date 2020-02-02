import React, { Fragment, useState, useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { RegisterFormStyle } from '../styles/style'
import { Icon } from 'react-icons-kit'
import { longArrowRight } from 'react-icons-kit/fa/longArrowRight'
import { Spinner, Row, Col, Nav, Button, Carousel, Image, Navbar, Form, Accordion, Card } from 'react-bootstrap';
import WebService from '../globals/WebService';
import { ErrorContext, UserListContext } from '../Context/Context';
import ErrorDisplay from '../globals/Error';
import { LOGIN, FORGOT_PASSWORD } from '../globals/links';
import { default as localforage } from 'localforage';
import { useEffect } from 'react'


const SignInForm = (props) => {
    const [username, updateUsername] = useState('')
    const [loading, updateLoading] = useState(false)
    const [error, setError] = useContext(ErrorContext);
    const [user, setUser] = useContext(UserListContext);
    
    useEffect(()=>{
        console.log(window.history)
        if(window.history.state !== null){
            console.log(window.history.state)
            setError(window.history.state)
            window.history.pushState(null, "error")
        }
    }, [])
    let service = new WebService()
    const submitForm = async ({ target }) => {
        let { id } = target
        switch (id) {
            case "Submit":
                // submit the form
                if (username.trim() == "") {
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
                    try {
                        let result = await service.sendPost(FORGOT_PASSWORD, {
                            username: username.trim()
                        })
                        console.log(result)
                        if (result.status == 201) {
                            let { data } = result;
                            localforage.removeItem('user', data)
                                .then((value) => {
                                    setError({
                                        show: true,
                                        isError: false,
                                        message: data
                                    })
                                    updateLoading(false)
                                    updateUsername('')
                                })
                        } else {
                            setError({
                                show: true,
                                isError: true,
                                message: result.response.data
                            })
                            updateLoading(false)
                        }
                    } catch (error) {
                        setError({
                            show: true,
                            isError: true,
                            message: "A network error occured"
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
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" onChange={handleChange} placeholder="Username" name="name" value={username}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <Button onClick={submitForm} id="Submit">
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span style={{ marginRight: "5px" }}>
                                        Loading ....
                                         </span>
                                </>
                            ) : (
                                    <>
                                        <span style={{ marginRight: "5px" }} onClick={submitForm} id="Submit">
                                            Reset Password
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