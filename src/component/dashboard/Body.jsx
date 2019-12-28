import React, { Fragment, useState, useContext } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import { UserListContext } from '../Context/Context'

export const Body = () => {
    let [user] = useContext(UserListContext)
    console.log(user)
    return (
        <Row>
            <Col lg={{span: 9, order: 1}} md={{span: 8, order: 1}} xs={{ order: 12 }}>
                <h3>Dashboard</h3>
                <DashboardStyle>
                    <Container fluid={true}>
                        <Row>
                            <Col className="courses" lg={12}>
                                <Container fluid={true}>
                                    <Row>
                                        <Col lg={12}>
                                            <h4>Available Courses</h4>
                                        </Col>
                                        <Col lg={6}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Image src={Courses1} rounded fluid />
                                                </Col>
                                                <Col lg={6}>
                                                    <h4>Business Administration</h4>
                                                    <p>Learn the keys to business success</p>
                                                </Col>
                                                <Col lg={12}>
                                                    <p>
                                                        Lorem ipsum Lorem ipsum dolor sit amet, Lorem ipsumdolor sit amet
                                                        consectetuer dipiscing elit consectetuer adipiscing elitdolor sit
                                                        amet consectetuer dipiscing elit
                                        </p>
                                                    <div className="text-right">
                                                        <ButtonStyle className="btn">
                                                            Register
                                            </ButtonStyle>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Image src={Courses2} rounded fluid />
                                                </Col>
                                                <Col lg={6}>
                                                    <h4>MS-Excel Business</h4>
                                                    <p>platform for tracking records</p>
                                                </Col>
                                                <Col lg={12}>
                                                    <p>
                                                        Lorem ipsum Lorem ipsum dolor sit amet, Lorem ipsumdolor sit amet
                                                        consectetuer dipiscing elit consectetuer adipiscing elitdolor sit
                                                        amet consectetuer dipiscing elit
                                        </p>
                                                    <div className="text-right">
                                                        <ButtonStyle className="btn">
                                                            Register
                                            </ButtonStyle>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="referral left" lg={6}>
                                <Container fluid={true}>
                                    <Row>
                                        <Col lg={6}>
                                            <h6>Referred members</h6>
                                        </Col>
                                        <Col lg={6} className="text-right">
                                            <Form>
                                                <Form.Group as={Row}>
                                                    <Form.Label column lg={2} md={2} sm={2} xs={2}>for</Form.Label>

                                                    <Col sm={10}>
                                                        <Form.Control type="date" />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                        <Col lg={12}>
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
                            <Col className="referral" lg={6}>
                                <Container fluid={true}>
                                    <Row>
                                        <Col lg={6}>
                                            <h6>Notification</h6>
                                        </Col>
                                        <Col lg={6} className="text-right">
                                            <Form>
                                                <Form.Group as={Row}>
                                                    <Form.Label column lg={2} md={2} sm={2} xs={2}>for</Form.Label>

                                                    <Col sm={10}>
                                                        <Form.Control type="date" />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>

                            </Col>

                        </Row>
                    </Container>
                </DashboardStyle>
            </Col>
            <Col lg={{span: 3, order: 12}} md={{span: 4, order: 12}} xs={{ span: 12,order: 1 }}>
                <Personal Data={{name: "Mr. Tega Osemudiamen", balance: "25,000", stage: "4"}}/>
            </Col>
        </Row>

    )
}