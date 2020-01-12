import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { EarningStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import WebService from '../globals/WebService'
import { MEMBERS_LINK, USER_LINK, ADMIN_MEMBERS_LINK } from '../globals/links'
import { UserListContext, MemberIdContext } from '../Context/Context'

export const Body = () => {
    let [user] = useContext(UserListContext)
    let [memberId, updateMemberId] = useContext(MemberIdContext)

    let [members1, updateMembers1] = useState('')
    let [membersLength, updateMembersLength] = useState('')
    let [members2, updateMembers2] = useState('')
    let [membersDate, updateMembersDate] = useState('')
    let [userBonus, updateUserBonus] = useState(null)
    let [membersLoading, updateMembersLoading] = useState(true)
    let [bonusLoading, updateBonusLoading] = useState(true)
    let service = new WebService()
    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let link
        user.role.name == "Admin" ? link = ADMIN_MEMBERS_LINK : link = MEMBERS_LINK;
        let result = await service.sendPost(link, {
            userId: user.user_id,
            date: date,
            offset: 0
        })
        if (result.status == 200) {
            let { data: {row, count} } = result
            let len = (row.length) / 2;
            let array1 = row.slice(0, len);
            let array2 = row.slice(len);
            updateMembersLength(row.length);
            updateMembers1(array1)
            updateMembers2(array2)
            updateMembersLoading(false)
        }
    }
    const fetchBalance = async () => {
        let result = await service.sendGet(`${USER_LINK}/bonus/${user.user_id}`)
        if (result.status == 200) {
            let { data } = result;
            updateUserBonus(data)
            updateBonusLoading(false)
        }
    }
    useEffect(() => {
        // glitch to prevent the balance display from hiding on the personal details component 
        updateMemberId({
            id: '',
            loading: false,
            offset: 0
        })
        fetchMembers("")
        fetchBalance();
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
                                                        {bonusLoading ? (
                                                            <Col lg={7} md={7} sm={7} xs={7}>
                                                                <Spinner animation="border" variant="warning" />
                                                            </Col>

                                                        ) : (
                                                                <>
                                                                    <Col lg={7} md={7} sm={7} xs={7}>

                                                                        <table>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Referal Bonus</td>
                                                                                    <td><b>${userBonus.referral}</b></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Matrix Bonus</td>
                                                                                    <td><b>${userBonus.matrix}</b></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Matching Bonus</td>
                                                                                    <td><b>${userBonus.matching}</b></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </Col>
                                                                    <Col style={{ position: "relative", top: "100px" }} lg={3} md={3} sm={3} xs={3}>
                                                                        <p><b>Total</b></p>
                                                                        <p><b>${userBonus.total}</b></p>
                                                                    </Col>
                                                                </>
                                                            )}

                                                    </Row>

                                                </Container>

                                            </EarningStyle>
                                        </Col>
                                        <Col className="referral" lg={12}>
                                            <Container fluid={true}>
                                                {membersLoading ? (
                                                    <Row>
                                                        <Col lg={12} className="text-center">
                                                            <Spinner animation="border" variant="success" />
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                        <>
                                                            {membersLength > 0 ? (

                                                                <Row>
                                                                    <Col lg={12}>
                                                                        <h3>Members</h3>
                                                                    </Col>
                                                                    <Col lg={6}>

                                                                        <Members Data={members1} />
                                                                    </Col>
                                                                    <Col lg={6}>

                                                                        <Members Data={members2} />
                                                                    </Col>
                                                                </Row>
                                                                // <Members Data={members} />
                                                            ) : ("No Referrals")}
                                                        </>
                                                    )}
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