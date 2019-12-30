import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Image, Spinner, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { MEMBERS_LINK } from '../globals/links'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import { UserListContext } from '../Context/Context'
import WebService from '../globals/WebService'

export const Body = () => {
    let [user] = useContext(UserListContext)
    let [members, updateMembers] = useState('')
    let [membersDate, updateMembersDate] = useState('')
    let [membersLoading, updateMembersLoading] = useState(true)
    let service = new WebService()
    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, {
            userId: user.user_id,
            date: date
        })
        if (result.status == 200) {
            let { data } = result
            updateMembers(data)
            updateMembersLoading(false)
        }
    }
    useEffect(() => {
        fetchMembers("")
    }, [])

    const handleDateChange = ({target})=>{
        let {name, value} = target;
        switch(name){
            case "members":
                updateMembersDate(value)
                fetchMembers(new Date(value).toISOString())
                break;
        }
    }
    return (
        <Row>
            <Col lg={{ span: 9, order: 1 }} md={{ span: 8, order: 1 }} xs={{ order: 12 }}>
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
                                                        <Form.Control type="date" name="members" value={membersDate} onChange={handleDateChange} />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                        <Col lg={12} className={membersLoading? "text-center" : ""}>
                                            {membersLoading ? (

                                                <Spinner  animation="border" variant="success" />
                                            ) : (
                                                <>
                                                {members.length> 0? (
                                                    <Members Data={members} />
                                                    ): ("No Referrals")}
                                                </>
                                                )}
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
            <Col lg={{ span: 3, order: 12 }} md={{ span: 4, order: 12 }} xs={{ span: 12, order: 1 }}>
                <Personal Data={{ name: "Mr. Tega Osemudiamen", balance: "25,000", stage: "4" }} />
            </Col>
        </Row>

    )
}