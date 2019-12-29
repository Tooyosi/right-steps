import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { PersonalStyle, ButtonStyle } from '../styles/style'
import { Spinner, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { Members } from './Members';
import { MEMBERS_LINK, REFERRAL_LINK } from './links'
import { UserListContext } from '../Context/Context';
import WebService from './WebService';

export const Personal = withRouter((props) => {
    let { Data } = props;
    let [user] = useContext(UserListContext)
    let [members, updateMembers] = useState('')
    let [membersLoading, updateMembersLoading] = useState(true)
    let [showModal, updateShowModal] = useState(false)
    let [referralLink, updateReferralLink] = useState('')
    let service = new WebService()
    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, {
            userId: user.user_id,
            date: date
        })
        try {
            if (result.status == 200) {
                let { data } = result
                updateMembers(data)
                updateMembersLoading(false)
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        fetchMembers("")
    }, [])

    const generateReferral = async () => {
        updateShowModal(true)

        let result = await service.sendPost(REFERRAL_LINK, { userId: 18 })
        try {
            if (result.status == 200) {
                let { data } = result
                console.log(window.location.origin)
                updateReferralLink(`${window.location.origin}/referral/${data}`)

            }
        } catch (error) {

        }
    }
    const handleClose = () => {
        updateShowModal(false)
    }
    return (
        <Fragment>
            <PersonalStyle>
                {/* <Container fluid={true}> */}
                <Row>
                    <Col lg={12}>
                        <h3>Personal</h3>
                        <div className="personal-card">
                            <div className="name">
                                <p>{Data.name}</p>
                            </div>
                            <div className="balance">
                                <p>My Balance</p>
                                <p>{Data.balance}</p>
                            </div>
                            <div className="balance">
                                <p>Stage</p>
                                <p>{Data.stage}</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="buttons text-center" lg={12}>
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <button className="first-btn" onClick={generateReferral}>
                                    Generate a referal link
                                </button>
                            </Col>

                            <Col lg={6} md={6} sm={6} xs={6}>
                                <Link to="/signup">
                                    <button className="second-btn">
                                    Add member
                                    </button>
                                            </Link>
                            </Col>
                            <Col lg={12}>
                                <ButtonStyle style={{ width: "100%" }} className="btn">
                                    Get lifetime membership
                                            </ButtonStyle>
                            </Col>
                        </Row>
                    </Col>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Referral Link</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{referralLink !== '' ? <a target="_blank" href={referralLink}> {referralLink} </a>: (
                            <Spinner animation="border" variant="success" />

                        )}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                    {props.HideMembers ? (null) : (
                        <div  className={membersLoading ? "text-center scroller" : "scroller"}>
                            {membersLoading ? (

                                <Spinner animation="border" variant="success" />
                            ) : (
                                    <>
                                        {members.length > 0 ? (
                                            <Members Data={members} />
                                        ) : ("No Referrals")}
                                    </>
                                )}
                        </div>
                    )}
                </Row>
                {/* </Container> */}
            </PersonalStyle>

        </Fragment>
    )
})