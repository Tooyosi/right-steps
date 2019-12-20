import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import {DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'

export const Body = () => {


    return (
        <Row>
            <Col lg={{ span: 4, order: 1 }} md={{ span: 4, order: 1 }} xs={{ order: 12 }}>
                <h3>Stages</h3>
                <DashboardStyle>
                    <Container fluid={true}>
                        <Row>
                            <Col className="stages" style={{ backgroundColor: "white" }} lg={12}>
                                <h4>MEMBERS</h4>

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
                </DashboardStyle>
            </Col>
            <Col lg={7} md={7} xs={{ span: 12, order: 1 }}>
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <h3>Progress</h3>
                        </Col>
                        <Col lg={12}>
                            <StageDivStyle style={{height: "13px"}} Stage="70%" Color={4}>
                                <div></div>
                            </StageDivStyle>
                        </Col>
                        <Col lg={12}>
                            <h3>Stage 5</h3>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>

    )
}