import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from '../globals/Members'
import { Personal } from '../globals/Personal'
import WebService from '../globals/WebService'
import { MEMBERS_LINK, ADMIN_MEMBERS_LINK } from '../globals/links'
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

    // for members
    let [memberOffset, updateMemberOffset] = useState(0)
    let [memberCurrentPage, updateMemberCurrentPage] = useState(1)
    let [memberTotalPages, updateMemberTotalPages] = useState('')

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
                    let newPageNo = notificationCurrentPage + 1
                    let newSkipValue = 10 + notificationOffset
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
                    fetchMembers("")
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
                    let newSkipValue = notificationOffset - 10
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
                    fetchMembers("")
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
                    // fetchMembers("")
                }
                break;
        }
    }

    const memberPages = fetchPageNumbers(memberTotalPages, memberStartPage, memberEndPage);

    const fetchMembers = async (date) => {
        let link
        user.role.name == "Admin" ? link = ADMIN_MEMBERS_LINK : link = MEMBERS_LINK;
        let result = await service.sendPost(link, {
            userId: user.user_id, 
            date: date,
            offset: memberOffset
        })

        updateMembersLoading(true);

        if (result.status == 200) {
            let { data: { row, count } } = result
            let len = (row.length) / 2;
            let array1 = row.slice(0, len);
            let array2 = row.slice(len);

            let pages = Math.ceil(Number(count) / 10)
            updateMemberTotalPages(pages)
            updateMembersLength(row.length);
            updateMembers1(array1)
            updateMembers2(array2)
            updateMembersLoading(false)
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
    }, [memberOffset])

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
                <Personal />
            </Col>
        </Row>

    )
}