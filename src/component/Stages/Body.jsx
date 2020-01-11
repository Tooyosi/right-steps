import React, { Fragment, useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { DashboardStyle, StageDivStyle } from '../styles/style'
import { Members } from '../globals/Members'
import { MEMBERS_LINK, USER_LINK } from '../globals/links'
import { UserListContext, MemberIdContext } from '../Context/Context'
import WebService from '../globals/WebService'
import Tree from 'react-hierarchy-tree';

const Body = (props) => {
    console.log(props)
    let [user] = useContext(UserListContext);
    let [members, updateMembers] = useState('');
    let [totalDecendants, updateTotalDecendants] = useState([]);
    let [decendantsLoading, updateDecendantsLoading] = useState(true);
    let [memberId, updateMemberId] = useContext(MemberIdContext);
    let [membersLoading, updateMembersLoading] = useState(true)
    let [loading, updateLoading] = useState(true)
    let service = new WebService();
    const svgSquare = {
        shape: 'rect',
        shapeProps: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
        }
    }


    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, {
            userId: date.id,
            date: date.date
        })
        if (result.status == 200) {
            let { data } = result
            updateMembers(data)
            updateMembersLoading(false)
        }
    }

    const fetchDownline = async (id) => {
        updateDecendantsLoading(true)

        let result = await service.sendGet(`${USER_LINK}/${id}`)
        let { data } = result
        let dataArr = [data]
        updateTotalDecendants(dataArr)
        updateDecendantsLoading(false)
    }
    useEffect(() => {
        updateLoading(false)
        if (props.location && props.location.state !== undefined) {
            fetchDownline(props.location.state)
            fetchMembers({ id: props.location.state, date: '' })
        } else if (memberId.loading == false) {
        fetchMembers({ id: user.user_id, date: '' })
        fetchDownline(user.user_id)
        }
        else {
        fetchMembers({ id: user.user_id, date: '' })
        fetchDownline(memberId.id)
        }
    }, [memberId])
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
                                        {membersLoading ? (
                                            <Col lg={12} className="text-center">
                                                <Spinner animation="border" variant="success" />
                                            </Col>

                                        ) : (
                                                <Col className="stages" style={{ backgroundColor: "white" }} lg={12}>
                                                    <h4>MEMBERS</h4>

                                                    <Members Data={members} />

                                                </Col>
                                            )}
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

                                </Row>

                                {decendantsLoading ? (
                                    <Spinner animation="border" variant="success" />

                                ) : (
                                        <Row>
                                            <Col lg={12}>
                                                <StageDivStyle style={{ height: "13px" }} Color={totalDecendants[0].current_stage}>
                                                    <div></div>
                                                </StageDivStyle>
                                            </Col>
                                            <Col lg={12}>
                                                <h3>Stage {totalDecendants[0].current_stage}</h3>
                                            </Col>
                                            <Col lg={12}>
                                                <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
                                                    <Tree data={totalDecendants} nodeSvgShape={svgSquare} collapsible={false} orientation="vertical" translate={{ x: 220, y: 20 }} pathFunc="elbow" nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10 } }} />
                                                </div>
                                            </Col>
                                        </Row>
                                    )}

                            </Container>
                        </Col>
                    </>
                )}
        </Row>

    )
}

export default withRouter(Body);