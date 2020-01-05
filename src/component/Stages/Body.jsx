import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { DashboardStyle, ButtonStyle, UserTreeStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import { MEMBERS_LINK, USER_LINK } from '../globals/links'
import { UserListContext, MemberIdContext } from '../Context/Context'
import WebService from '../globals/WebService'

export const Body = () => {
    let [user] = useContext(UserListContext);
    let [members, updateMembers] = useState('');
    let [rightMembers, updateRihtMembers] = useState([]);
    let [leftMembers, updateLeftMembers] = useState([]);
    let [memberId, updateMemberId] = useContext(MemberIdContext);
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
            updateMembers(data)
            updateLoading(false)
        }
    }

    const fetchDownline = async (id) => {
        let res = await service.sendGet(`${USER_LINK}/${id}`)
        let { data: { result } } = res
        return result
    }
    useEffect(() => {
        if (memberId.loading == false) {
            fetchMembers("")
            let downlines = async () => {
                let result = await fetchDownline(user.user_id)

                if (result.right_leg_id !== null) {
                    let rigtIds = [{ position: 0, id: result.right_leg_id, details: result.right_leg }]
                    let leftIds = [{ position: 0, id: result.left_leg_id, details: result.left_leg }]
                    for (let i = 0; i < 5; i++) {
                        if (rigtIds[i] !== null && rigtIds[i] !== undefined) {
                            let rightLeg = await fetchDownline(rigtIds[i].id)
                            let leftLeg = await fetchDownline(leftIds[i].id)
                            if (rightLeg !== null) {
                                rigtIds.push({ position: (i + 1), id: rightLeg.right_leg_id, details: rightLeg.right_leg })
                            }
                            if (leftLeg !== null) {
                                leftIds.push({ position: (i + 1), id: leftLeg.left_leg_id, details: leftLeg.left_leg })
                            }
                        }
                    }
                    updateRihtMembers(rigtIds)
                    updateLeftMembers(leftIds)
                }
            }
            // downlines()
        }
        else {
            fetchDownline(memberId)
        }
    }, [memberId])
    console.log(rightMembers, "right")
    console.log(leftMembers, "left")
    return (
        <Row>
            {loading ? (
                <Col className="text-center">
                    <Spinner animation="border" variant="success" />

                </Col>
            ) : (
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
                                        <StageDivStyle style={{ height: "13px" }} Color={4}>
                                            <div></div>
                                        </StageDivStyle>
                                    </Col>
                                    <Col lg={12}>
                                        <h3>Stage 5</h3>
                                    </Col>
                                    <Col lg={12}>
                                        <UserTreeStyle>
                                        <div className="tree">
                                            <ul>
                                                <li>
                                                    <a href="#">{user.user_id}</a>
                                                    <ul>
                                                        <li>
                                                            <a href="#">{leftMembers.length > 0 && leftMembers[0].details.user_id !== null ? leftMembers[0].details.user_id : '2'}</a>
                                                            {leftMembers.length > 0? (
                                                            <ul>
                                                                {leftMembers.map((member, i)=>(
                                                                <li key={i}>
                                                                    <a href="#">{member.details.username}</a>
                                                                    
                                                                </li>
                                                                ))}
                                                                <li>
                                                                    {/* <a href="#">2.2</a> */}
                                                                </li>
                                                            </ul>
                                                            ): ('')}
                                                        </li>
                                                        <li>
                                                            <a href="#">3</a>
                                                            <ul>
                                                                <ul>
                                                                    <li>
                                                                        <a href="#">3.1</a>
                                                                        <ul>
                                                                            <li>
                                                                                <a href="#">3.1.1</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">3.1.2</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#">3.2</a>
                                                                    </li>
                                                                </ul>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        </UserTreeStyle>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </>
                )}
        </Row>

    )
}