import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import {DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import { MEMBERS_LINK } from '../globals/links'
import { UserListContext } from '../Context/Context'
import WebService from '../globals/WebService'

export const Body = () => {
    let [user] = useContext(UserListContext);
    let [members, updateMembers] = useState('');
    let [membersLoading, updateMembersLoading] = useState(true)
    let [loading, updateLoading] = useState(true)
    let service = new WebService();
    const fetchMembers = async (date) => {
        updateLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, {
            userId: user.user_id,
            date: date
        })
        if (result.status == 200) {
            let { data } = result
            console.log(data)
            updateMembers(data)
            updateLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers("")
    }, [])
    return (
        <Row>
            {loading?(
                <Col className="text-center">
                                                <Spinner  animation="border" variant="success" />
                
                </Col>
            ): (
                <>
            <Col lg={{ span: 4, order: 1 }} md={{ span: 4, order: 1 }} xs={{ order: 12 }}>
                <h3>Stages</h3>
                <DashboardStyle>
                    <Container fluid={true}>
                        <Row>
                            <Col className="stages" style={{ backgroundColor: "white" }} lg={12}>
                                <h4>MEMBERS</h4>

                                <Members Data={members} />

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
                            <StageDivStyle style={{height: "13px"}}  Color={4}>
                                <div></div>
                            </StageDivStyle>
                        </Col>
                        <Col lg={12}>
                            <h3>Stage 5</h3>
                        </Col>
                    </Row>
                </Container>
            </Col>
            </>
            )}
       </Row>

    )
}