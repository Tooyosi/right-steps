import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import WebService from '../globals/WebService'
import { MEMBERS_LINK } from '../globals/links'
import { UserListContext, MemberIdContext } from '../Context/Context'

export const Body = () => {
    let [user] = useContext(UserListContext)
    let [members1, updateMembers1] = useState('')
    let [membersLength, updateMembersLength] = useState('')
    let [members2, updateMembers2] = useState('')
    let [membersDate, updateMembersDate] = useState('')
    let [membersLoading, updateMembersLoading] = useState(true)
    let [memberId, updateMemberId] = useContext(MemberIdContext)
    let service = new WebService()
    
    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, {
            userId: user.user_id,
            date: date
        })
        if (result.status == 200) {
            let { data } = result
            let len = (data.length) / 2;
            let array1 = data.slice(0, len);
            let array2 = data.slice(len);
            updateMembersLength(data.length);
            updateMembers1(array1)
            updateMembers2(array2)
            updateMembersLoading(false)
        }
    }
    useEffect(() => {
        // glitch to prevent the balance display from hiding on the personal details component 
        updateMemberId({
            id: '',
            loading: false
        })
        fetchMembers("")
    }, [])

    const handleDateChange = ({ target }) => {
        let { name, value } = target;
        switch (name) {
            case "members":
                updateMembersDate(value)
                fetchMembers(new Date(value).toISOString())
                break;
        }
    }

    return (
        <Row>
            <Col lg={{ span: 9, order: 1 }} md={{ span: 8, order: 1 }} xs={{ order: 12 }}>
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
                                                        <Form.Control type="date" name="members" value={membersDate} onChange={handleDateChange} />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                        <>
                                                {membersLoading ? (
                                                    <Row>
                                                        <Col lg={12} className="text-center">
                                                            <Spinner animation="border" variant="success" />
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                        <>
                                                            {membersLength > 0 ? (

                                                                <>
                                                                    <Col lg={12}>
                                                                        <h3>Members</h3>
                                                                    </Col>
                                                                    <Col lg={6}>

                                                                        <Members Data={members1} />
                                                                    </Col>
                                                                    <Col lg={6}>

                                                                        <Members Data={members2} />
                                                                    </Col>
                                                                </>
                                                                // <Members Data={members} />
                                                            ) : ("No Referrals")}
                                                        </>
                                                    )}
                                            </>
                                        </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </DashboardStyle>
            </Col>
            <Col lg={{ span: 3, order: 12 }} md={{ span: 4, order: 12 }} xs={{ span: 12, order: 1 }}>
                <Personal  />
            </Col>
        </Row>

    )
}