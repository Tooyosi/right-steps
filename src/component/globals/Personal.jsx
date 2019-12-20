import React, { Fragment, useState } from 'react'
import { PersonalStyle, ButtonStyle } from '../styles/style'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { Members } from './Members';

export const Personal = (props) => {
    let { Data } = props;
    return (
        <Fragment>
            <PersonalStyle>
                {/* <Container fluid={true}> */}
                <Row>
                    <Col lg={12}>
                        <h3>Personal</h3>
                        <div className="personal-card">
                            <div className="name">
                                <p>{Data.name}</p>
                            </div>
                            <div className="balance">
                                <p>My Balance</p>
                                <p>{Data.balance}</p>
                            </div>
                            <div className="balance">
                                <p>Stage</p>
                                <p>{Data.stage}</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="buttons text-center" lg={12}>
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <button className="first-btn">
                                    Generate a referal link
                                </button>
                            </Col>

                            <Col lg={6} md={6} sm={6} xs={6}>
                                <button className="second-btn">
                                    Add member
                                            </button>
                            </Col>
                            <Col lg={12}>
                                <ButtonStyle style={{ width: "100%" }} className="btn">
                                    Get lifetime membership
                                            </ButtonStyle>
                            </Col>
                        </Row>
                    </Col>
                    {props.HideMembers ? (null): (
                        <div className="scroller">
                            <Members Data={[{
                                name: "Mr Tega",
                                state: "Lagos",
                                stage: "3"
                            },
                            {
                                name: "Mr Robo",
                                state: "Lagos",
                                stage: "4"
                            },
                            {
                                name: "Mr Chibu",
                                state: "Lagos",
                                stage: "5"
                            },
                            {
                                name: "Mr Chris",
                                state: "Lagos",
                                stage: "2"
                            },
                            {
                                name: "Mr Dammy",
                                state: "Lagos",
                                stage: "1"
                            },]} />
                        </div>
                    )}
                </Row>
                {/* </Container> */}
            </PersonalStyle>

        </Fragment>
    )
}