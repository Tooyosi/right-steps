import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'

export const Body = () => {


    return (
        <Row>
            <Col lg={{span: 9, order: 1}} md={{span: 8, order: 1}} xs={{ order: 12 }}>
                <h3>Members</h3>
                <DashboardStyle>
                    <Container fluid={true}>
                        <Row>
                            <Col className="referral left" lg={12}>
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
                </DashboardStyle>
            </Col>
            <Col lg={{span: 3, order: 12}} md={{span: 4, order: 12}} xs={{ span: 12,order: 1 }}>
                <Personal Data={{name: "Mr. Tega Osemudiamen", balance: "25,000", stage: "4"}}/>
            </Col>
        </Row>

    )
}