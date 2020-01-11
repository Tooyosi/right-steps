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
            case 'member':
                if (memberCurrentPage > !memberStartPage) {
                    let newPageNo = notificationCurrentPage + 1
                    let newSkipValue = 10 + notificationOffset
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
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
            case 'member':
                if (memberStartPage > !memberCurrentPage) {
                    let newPageNo = memberCurrentPage - 1
                    let newSkipValue = notificationOffset - 10
                    updateMemberCurrentPage(newPageNo)
                    updateMemberOffset(newSkipValue)
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

    const memberPages = fetchPageNumbers(memberTotalPages, memberStartPage, memberEndPage);


    const fetchMembers = async (date) => {
        updateMembersLoading(true);
        let result = await service.sendPost(MEMBERS_LINK, {
            userId: date.id,
            date: date.date,
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
    }, [memberId, memberOffset])
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
                                                    <Tree data={totalDecendants} nodeSvgShape={svgSquare} collapsible={false} orientation="vertical" translate={{ x: 250, y: 20 }} pathFunc="elbow" nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10 } }} />
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