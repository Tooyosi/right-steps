import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle, RegisterFormStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import WebService from '../globals/WebService'
import { MEMBERS_LINK, REQUEST_LINK } from '../globals/links'
import { UserListContext, MemberIdContext, ErrorContext } from '../Context/Context'
import ErrorDisplay from '../globals/Error'
import { Icon } from 'react-icons-kit'
import { longArrowRight } from 'react-icons-kit/fa/longArrowRight'
import { History } from './History'
import { Awards } from './Awards'
import { Transfers } from './Transfers'

export const Body = () => {
    let [user] = useContext(UserListContext)
    let [transType, updateTransType] = useState('')
    let [amount, updateAmount] = useState('')
    let [proof, updateProof] = useState('')
    let [membersDate, updateMembersDate] = useState('')
    let [membersLoading, updateMembersLoading] = useState(true)
    let [memberId, updateMemberId] = useContext(MemberIdContext)
    let service = new WebService()
    const [error, setError] = useContext(ErrorContext);
    const [loading, updateLoading] = useState(false)

    let [active, updateActive] = useState(1)
   
    const switchTabs = async ({ target }) => {
        let { id } = target;
        switch (id) {
            case 'make':
                active !== 1 ? updateActive(1) : null;
                break;
            case 'approve':
                active !== 2 ? updateActive(2) : null;
                break;
            case 'pending':
                active !== 3 ? updateActive(3) : null;
                break;
            case 'history':
                active !== 4 ? updateActive(4) : null;
                break;
            case 'awards':
                active !== 5 ? updateActive(5) : null;
                break;
            case 'transfers':
                active !== 6 ? updateActive(6) : null;
                break;
        }
    }

    const submitForm = async () => {
        if (transType == 'Deposit' && proof == '') {
            setError({
                show: true,
                isError: true,
                message: 'Attach Proof of payment for a Deposit transaction'
            })
        } else if (amount == '' || transType == '') {
            setError({
                show: true,
                isError: true,
                message: 'One or more input parameters are missing'
            })
        } else {

            setError({
                show: false,
                isError: false,
                message: ''
            })
            updateLoading(true)
            let dataToSend = new FormData()
            proof !== '' ? dataToSend.append("proofImage", proof) : null
            dataToSend.append("userId", user.user_id)
            dataToSend.append("type", transType)
            dataToSend.append("amount", amount)
            dataToSend.append("date", new Date().toISOString())

            let result = await service.sendPost(REQUEST_LINK, dataToSend)
            // console.log(result)
            if (result.status == 200) {
                let { data } = result
                setError({
                    show: true,
                    isError: false,
                    message: data
                })
                updateAmount('')
                updateTransType('')
                updateProof('')
            } else {
                setError({
                    show: true,
                    isError: true,
                    message: result.response.data ? result.response.data : 'An error occured'
                })
            }
            updateLoading(false)

        }
    }
    useEffect(() => {
        // glitch to prevent the balance display from hiding on the personal details component 
        if(user.role.name == "Admin"){
            updateActive(2)
        }
    }, [])

    const handleChange = ({ target }) => {
        let { name, value } = target;
        switch (name) {
            case "amount":
                updateAmount(value)
                break;
            case "transactionType":
                updateTransType(value)
                break;
            case "image":
                updateProof(target.files[0])
                break;
        }
    }
    return (
        <Container fluid={true}>
            <Row className="text-center">
                {user.role.name !== "Admin" ? (
                    <Col lg={2} md={2} sm={3} xs={6} onClick={switchTabs} style={{ color: active == 1 ? '#49C5A1' : '#B8C5D3' }} id="make">Make Request</Col>
                ) : (null)}

                {/* <Col lg={2} md={2} sm={3} xs={3} onClick={switchTabs} style={{ color: active == 2 ? '#49C5A1' : '#B8C5D3' }} id="approve">Approved Requests</Col> */}
                {user.role.name == "Admin" ? (
                <Col lg={2} md={2} sm={3} xs={3} onClick={switchTabs} style={{ color: active == 3 ? '#49C5A1' : '#B8C5D3' }} id="pending">Pending Requests</Col>
                ) : (null)}

                <Col lg={2} md={2} sm={3} xs={6} onClick={switchTabs} style={{ color: active == 4 ? '#49C5A1' : '#B8C5D3' }} id="history">Transaction History</Col>
                <Col lg={2} md={2} sm={3} xs={6} onClick={switchTabs} style={{ color: active == 5 ? '#49C5A1' : '#B8C5D3' }} id="awards">Awards</Col>
                <Col lg={2} md={2} sm={3} xs={6} onClick={switchTabs} style={{ color: active == 6 ? '#49C5A1' : '#B8C5D3' }} id="transfers">Transfers</Col>
            </Row>
            <br />
            {user.role.name !== "Admin" ? (

                <Row style={{ display: active == 1 ? 'block' : 'none' }}>
                    <Col lg={{ span: 6, offset: 3 }} sm={12}>
                        <RegisterFormStyle>
                            <Form>
                                <Container fluid={true}>

                                    <Row>
                                        <Col>
                                            {error.show ? (
                                                <ErrorDisplay message={error.message} error={error.isError} />
                                            ) : null}
                                        </Col>
                                        <Col lg={12} >
                                            <Form.Group>
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control type="number" value={amount} placeholder="amount" name="amount" min="0" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12}>
                                            <Form.Group>
                                                <Form.Label>Proof</Form.Label>
                                                <Form.Control type="file" name="image" accept='image/*' onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-left" lg={6} md={6} sm={6}>
                                            <Form.Group>
                                                <Form.Control as="select" name="transactionType" onChange={handleChange}>
                                                    <option value="">Transaction Type</option>
                                                    <option value="Deposit">Deposit</option>
                                                    <option value="Withdrawal">Withdrawal</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="text-right" lg={6} md={6} sm={6}>
                                            <Button id="Submit">
                                                {loading ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                        <span style={{ marginRight: "5px" }}>
                                                            Loading ....
                                         </span>
                                                    </>
                                                ) : (
                                                        <>
                                                            <span style={{ marginRight: "5px" }} onClick={submitForm} id="Submit">
                                                                Apply
                                         </span>
                                                            <Icon size={'12px'} icon={longArrowRight} onClick={submitForm} id="Submit" />

                                                        </>

                                                    )}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </RegisterFormStyle>

                    </Col>
                </Row>
            ) : (null)}
            <Row style={{ display: active == 2 ? 'block' : 'none' }}>
                {active == 2 ? (
                    <Col lg={12}>
                        <History type='Approved' />
                    </Col>
                ) : (null)}
            </Row>
            <Row style={{ display: active == 3 ? 'block' : 'none' }}>
                {active == 3 ? (
                    <Col lg={12}>
                        <History type='Pending' />
                    </Col>
                ) : (null)}
            </Row>
            <Row style={{ display: active == 4 ? 'block' : 'none' }}>
                {active == 4 ? (
                    <Col lg={12}>
                        <History type='' />
                    </Col>
                ) : (null)}
            </Row>
            <Row style={{ display: active == 5 ?'block' : 'none' }}>
                {active == 5 ? (
                    <Col lg={12}>
                        <Awards />
                    </Col>
                ) : (null)}
            </Row>
            <Row style={{ display: active == 6 ?'block' : 'none' }}>
                {active == 6 ? (
                    <Col lg={12}>
                        <Transfers />
                    </Col>
                ) : (null)}
            </Row>
        </Container>

    )
}