import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { EarningStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'

export const Body = () => {


    return (
        <Row>
            <Col lg={12}>
                <h3>Balance</h3>
                <DashboardStyle>
                    <Container fluid={true}>
                        <Row>
                            <Col className="balance-personal" lg={6}>
                                <Personal Data={{ name: "Mr. Tega Osemudiamen", balance: "25,000", stage: "4" }} HideMembers={true} />
                            </Col>

                            <Col lg={6}>
                                <Container fluid={true}>
                                    <Row>
                                        <Col lg={12}>
                                            <EarningStyle>
                                                <Container fluid={true}>
                                                    <Row>
                                                        <Col lg={12}>

                                                            <h4>Earning Breakdown</h4>
                                                        </Col>
                                                        <Col lg={7} md={7} sm={7} xs={7}>
                                                            <table>
                                                                <tr>
                                                                    <td>Referal Bonus</td>
                                                                    <td><b>$5000</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Matrix Bonus</td>
                                                                    <td><b>$15000</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Matching Bonus</td>
                                                                    <td><b>$15000</b></td>
                                                                </tr>
                                                            </table>
                                                        </Col>
                                                        <Col style={{ position: "relative", top: "100px" }} lg={3} md={3} sm={3} xs={3}>
                                                            <p><b>Total</b></p>
                                                            <p><b>$25000</b></p>
                                                        </Col>
                                                    </Row>

                                                </Container>

                                            </EarningStyle>
                                        </Col>
                                        <Col className="referral" lg={12}>
                                            <Container fluid={true}>
                                                <Row>
                                                    <Col lg={12}>
                                                        <h3>Members</h3>
                                                    </Col>
                                                    <Col lg={6}>

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
                                                    </Col>
                                                    <Col lg={6}>

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
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </DashboardStyle>
            </Col>
        </Row>

    )
}