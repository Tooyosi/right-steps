import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { PersonalStyle, ButtonStyle } from '../styles/style'
import { Spinner, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { Members } from './Members';
import { MEMBERS_LINK, REFERRAL_LINK, ADMIN_MEMBERS_LINK, ADMIN_REFERRAL_LINK } from './links'
import { UserListContext } from '../Context/Context';
import WebService from './WebService';

export const Personal = withRouter((props) => {
    let { Data } = props;
    let [user] = useContext(UserListContext)
    let [members, updateMembers] = useState('')
    let [personalDataLoading, updatePersonalDataLoading] = useState(true);
    let [personalDetails, updatePersonalDetails] = useState('')
    let [membersLoading, updateMembersLoading] = useState(true)
    let [showModal, updateShowModal] = useState(false)
    let [referralLink, updateReferralLink] = useState('')
    let service = new WebService()
    const fetchMembers = async (data) => {
        updateMembersLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, data)
        try {
            if (result.status == 200) {
                let { data } = result
                updateMembers(data)
                updateMembersLoading(false)
            }

        } catch (error) {

        }
    }

    const fetchDetails = async (url) => {
        let result = await service.sendGet(url)
        let { data } = result;
        updatePersonalDetails(data)
        updatePersonalDataLoading(false)
    }
    useEffect(() => {
        fetchMembers({
            userId: user.user_id,
            date: ""
        });
        if(user.role.name == "Admin"){
            fetchDetails(`${ADMIN_MEMBERS_LINK}/${user.user_id}`)

        }else{
            fetchDetails(`${MEMBERS_LINK}/${user.user_id}`)
        }
    }, [])

    const generateReferral = async () => {
        updateShowModal(true)
        try {
            let result 
            if(user.role.name == "Admin"){
                result = await service.sendGet(`${ADMIN_REFERRAL_LINK}/${user.user_id }`)
    
            }else{
                result = await service.sendGet(`${REFERRAL_LINK}/${user.user_id }`)
    
            }
            if (result.status == 200) {
                let { data } = result
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
                    <Col lg={12} className={personalDataLoading ? "text-center" : ''}>
                        <h3>Personal</h3>
                        <div className="personal-card">
                            {personalDataLoading ? (

                                <Spinner animation="border" variant="light" />
                            ) : (
                                    <>
                                        <div className="name">
                                            <p>{personalDetails.user.gender == "Male"? "Mr." : "Mrs."} {personalDetails.user.firstname} {personalDetails.user.lastname}</p>
                                        </div>
                                        <div className="balance">
                                            <p>My Balance</p>
                                            <p>{personalDetails.account.balance}</p>
                                        </div>
                                        <div className="balance">
                                            <p>Stage</p>
                                            <p>{personalDetails.current_stage}</p>
                                        </div>  </>
                                )}
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
                        <Modal.Body>{referralLink !== '' ? <a target="_blank" href={referralLink}> {referralLink} </a> : (
                            <Spinner animation="border" variant="success" />

                        )}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                    {props.HideMembers ? (null) : (
                        <div className={membersLoading ? "text-center scroller" : "scroller"}>
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