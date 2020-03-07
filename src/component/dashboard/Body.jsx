import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Image, Spinner, Form, Pagination } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { MEMBERS_LINK, USER_NOTIFICATION_LINK, ADMIN_MEMBERS_LINK } from '../globals/links'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import { UserListContext, MemberIdContext } from '../Context/Context'
import WebService from '../globals/WebService'

export const Body = () => {
    let [user] = useContext(UserListContext)
    let [members, updateMembers] = useState('')
    let [membersDate, updateMembersDate] = useState('')
    let [membersLoading, updateMembersLoading] = useState(true)
    let [notificationsDate, updateNotificationsDate] = useState('')
    let [notifications, updateNotifications] = useState('')
    let [notificationOffset, updateNotificationOffset] = useState(0)
    let [notificationCurrentPage, updateNotificationCurrentPage] = useState(1)
    let [notificationTotalPages, updateNotificationTotalPages] = useState('')

    // for members
    let [memberOffset, updateMemberOffset] = useState(0)
    let [memberCurrentPage, updateMemberCurrentPage] = useState(1)
    let [memberTotalPages, updateMemberTotalPages] = useState('')

    let [notificationsLoading, updateNotificationsLoading] = useState(true)
    let [memberId, updateMemberId] = useContext(MemberIdContext)
    let service = new WebService()

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';


    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    }

    const getStartPage = (currentPage) => {
        let startPage = Math.max(2, currentPage - 2);
        return startPage
    }

    const getEndPage = (totalPages, currentPage) => {
        const endPage = Math.min(totalPages - 1, currentPage + 2);
        return endPage
    }

    let notificationStartPage = getStartPage(notificationCurrentPage)
    const notificationEndPage = getEndPage(notificationTotalPages, notificationCurrentPage);

    let memberStartPage = getStartPage(memberCurrentPage)
    let memberEndPage = getEndPage(memberTotalPages, memberCurrentPage);

    const fetchPageNumbers = (totalPages, startPage, endPage) => {
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (2 * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];

        }

        return range(1, totalPages);

    }

    const handleMoveRight = evt => {
        evt.preventDefault();
        let { name } = evt.target;
        switch (name) {
            case 'notification':
                if (notificationCurrentPage > !notificationStartPage) {
                    let newPageNo = notificationCurrentPage + 1
                    let newSkipValue = 10 + notificationOffset
                    updateNotificationCurrentPage(newPageNo)
                    updateNotificationOffset(newSkipValue)
                }
                break;
            case 'member':
                if (memberCurrentPage > !memberStartPage) {
                    let newPageNo = memberCurrentPage + 1
                    let     newSkipValue = 10 + memberOffset
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
                    // fetchMembers("")
                }
                break;
            default:
                break;
        }

    }

    const handleMoveLeft = (evt) => {
        evt.preventDefault();
        let { name } = evt.target
        switch (name) {
            case 'notification':
                if (notificationStartPage > !notificationCurrentPage) {
                    let newPageNo = notificationCurrentPage - 1
                    let newSkipValue = notificationOffset - 10
                    updateNotificationCurrentPage(newPageNo)
                    updateNotificationOffset(newSkipValue)
                    // fetchUsers()
                }
                break;
            case 'member':
                if (memberStartPage > !memberCurrentPage) {
                    let newPageNo = memberCurrentPage - 1
                    let newSkipValue = memberOffset - 10
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
                    // fetchMembers("")
                }
                break;
            default:
                break;
        }

    }

    const pageClick = (e) => {
        e.preventDefault();

        let { id, name } = e.target
        switch (name) {
            case "notification":
                if (id != notificationCurrentPage) {
                    let newPageNo = Number(id)
                    let newSkipValue = 10 * (newPageNo - 1)
                    updateNotificationCurrentPage(newPageNo)
                    updateNotificationOffset(newSkipValue)
                }
                break;
            case "member":
                if (id != memberCurrentPage) {
                    let newPageNo = Number(id)
                    let newSkipValue = 10 * (newPageNo - 1)
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
                }
                break;
        }
    }
    const notificationPages = fetchPageNumbers(notificationTotalPages, notificationStartPage, notificationEndPage);
    const memberPages = fetchPageNumbers(memberTotalPages, memberStartPage, memberEndPage);

    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let link
        user.role.name == "Admin" ? link = ADMIN_MEMBERS_LINK : link = MEMBERS_LINK;
        let result = await service.sendPost(link, {
            userId: user.user_id,
            date: date,
            offset: memberOffset
        })
        if (result.status == 200) {
            let { data: { row, count } } = result

            let pages = Math.ceil(Number(count) / 10)
            updateMemberTotalPages(pages)
            updateMembers(row)
            updateMembersLoading(false)
        }
    }

    const fetchNotifications = async (date) => {
        updateNotificationsLoading(true);
        let result = await service.sendPost(USER_NOTIFICATION_LINK, {
            userId: user.user_id,
            date: date,
            offset: notificationOffset
        })
        if (result.status == 200) {
            let { data: { rows, count } } = result
            updateNotifications(rows)
            let pages = Math.ceil(Number(count) / 10)
            updateNotificationTotalPages(pages)
            updateNotificationsLoading(false)
        }
    }
    useEffect(() => {
        // glitch to prevent the balance display from hiding on the personal details component 
        // if (notificationOffset === 0) {
            updateMemberId({
                id: '',
                loading: false
            })
            fetchMembers("")
        // }
        fetchNotifications("")
    }, [notificationOffset, memberOffset])

    const handleDateChange = ({ target }) => {
        let { name, value } = target;
        switch (name) {
            case "members":
                updateMembersDate(value)
                fetchMembers(new Date(value).toISOString())
                break;
            case "notifications":
                updateNotificationsDate(value)
                fetchNotifications(new Date(value).toISOString())
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
                                        <Col lg={12} className={membersLoading ? "text-center" : ""}>
                                            {membersLoading ? (

                                                <Spinner animation="border" variant="success" />
                                            ) : (
                                                    <>
                                                        {members.length > 0 ? (
                                                            <>
                                                                <Members Data={members} />
                                                                <div id="page-numbers" className="pull-right">
                                                                    <ul className="pagination">
                                                                        {memberPages.map((page, index) => {

                                                                            if (page === LEFT_PAGE) return (
                                                                                <li key={index} className="page-item">
                                                                                    <a className="page-link" aria-label="Previous" onClick={handleMoveLeft} name="member">
                                                                                        <span aria-hidden="true">&laquo;</span>
                                                                                        <span className="sr-only">Previous</span>
                                                                                    </a>
                                                                                </li>
                                                                            );

                                                                            if (page === RIGHT_PAGE) return (
                                                                                <li key={index} className="page-item">
                                                                                    <a className="page-link" aria-label="Next" onClick={handleMoveRight} name="member">
                                                                                        <span aria-hidden="true">&raquo;</span>
                                                                                        <span className="sr-only">Next</span>
                                                                                    </a>
                                                                                </li>
                                                                            );

                                                                            return (
                                                                                <li key={index} className={`page-item${memberCurrentPage === page ? ' active' : ''}`}>
                                                                                    <a className="page-link" id={page} onClick={pageClick} name="member">{page}</a>
                                                                                </li>
                                                                            );

                                                                        })}

                                                                    </ul>
                                                                </div>

                                                            </>
                                                        ) : ("No Referrals")}
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
                                                        <Form.Control type="date" name="notifications" value={notificationsDate} onChange={handleDateChange} />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            {notificationsLoading ? (

                                                <Spinner animation="border" variant="success" />
                                            ) : (
                                                    <>
                                                        {notifications.length > 0 ? (
                                                            <>
                                                                {notifications.map((notification, i) => (
                                                                    <div key={i}>
                                                                        <p className="text-right"><small >Date: {notification.date}</small></p>
                                                                        <p >
                                                                            {notification.message}
                                                                        </p>
                                                                    </div>

                                                                ))}
                                                            </>
                                                        ) : ("No Notifications To Display")}
                                                    </>
                                                )}
                                            <div id="page-numbers" className="pull-right">
                                                <ul className="pagination">
                                                    {notificationPages.map((page, index) => {

                                                        if (page === LEFT_PAGE) return (
                                                            <li key={index} className="page-item">
                                                                <a className="page-link" aria-label="Previous" onClick={handleMoveLeft} name="notification">
                                                                    <span aria-hidden="true">&laquo;</span>
                                                                    <span className="sr-only">Previous</span>
                                                                </a>
                                                            </li>
                                                        );

                                                        if (page === RIGHT_PAGE) return (
                                                            <li key={index} className="page-item">
                                                                <a className="page-link" aria-label="Next" onClick={handleMoveRight} name="notification">
                                                                    <span aria-hidden="true">&raquo;</span>
                                                                    <span className="sr-only">Next</span>
                                                                </a>
                                                            </li>
                                                        );

                                                        return (
                                                            <li key={index} className={`page-item${notificationCurrentPage === page ? ' active' : ''}`}>
                                                                <a className="page-link" id={page} onClick={pageClick} name="notification">{page}</a>
                                                            </li>
                                                        );

                                                    })}

                                                </ul>
                                            </div>

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