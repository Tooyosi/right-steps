import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Spinner, Button, Form, Table, Image, Modal } from 'react-bootstrap'
import { HistoryStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle, RegisterFormStyle } from '../styles/style'
import { MEMBERS_LINK, REQUEST_LINK, BASE_URL } from '../globals/links'
import { UserListContext, MemberIdContext, ErrorContext } from '../Context/Context'
import ErrorDisplay from '../globals/Error'
import WebService from '../globals/WebService'

export const History = (props) => {
    let [user] = useContext(UserListContext)
    let [offset, updateOffset] = useState(0)
    let [date, updateDate] = useState('')
    let [history, updateHistory] = useState('')
    let [currentPage, updateCurrentPage] = useState(1)
    let [totalPages, updateTotalPages] = useState('')
    let [approveLoading, updateApproveLoading] = useState(false)
    let [declineLoading, updateDeclineLoading] = useState(false)
    let service = new WebService()
    let [showModal, updateShowModal] = useState(false)
    const [error, setError] = useContext(ErrorContext);
    const [imageLink, updateImageLink] = useContext(ErrorContext);
    const [loading, updateLoading] = useState(true)
    // for members


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

    let startPage = Math.max(2, currentPage - 2);


    const endPage = Math.min(totalPages - 1, currentPage + 2);

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
        if (currentPage > !startPage) {
            let newPageNo = currentPage + 1
            let newSkipValue = 10 + offset
            updateCurrentPage(newPageNo)
            updateOffset(newSkipValue)
        }

    }

    const handleMoveLeft = (evt) => {
        evt.preventDefault();

        if (startPage > !currentPage) {
            let newPageNo = currentPage - 1
            let newSkipValue = offset - 10
            updateCurrentPage(newPageNo)
            updateOffset(newSkipValue)
        }

    }

    const pageClick = (e) => {
        e.preventDefault();

        let { id } = e.target
        if (id != currentPage) {
            let newPageNo = Number(id)
            let newSkipValue = 10 * (newPageNo - 1)
            updateCurrentPage(newPageNo)
            updateOffset(newSkipValue)
        }
    }

    const pages = fetchPageNumbers(totalPages, startPage, endPage);

    let fetchHistory = async (type) => {
        updateLoading(true)

        let link;
        user.role.name == "Admin" ? link = `${REQUEST_LINK}?offset=${offset}&date=${date}&userId&status=${type}` : link = `${REQUEST_LINK}?offset=${offset}&date=${date}&userId=${user.user_id}&status=${type}`
        console.log(link)
        let result = await service.sendGet(link)
        if (result.status == 200) {
            let { data: { rows, count } } = result
            let pages = Math.ceil(Number(count) / 10)
            updateTotalPages(pages)
            updateHistory(rows)
            updateLoading(false)
        } else {
            setError({
                show: true,
                isError: true,
                message: result.response ? result.response.data : 'An error occured'
            })
            updateHistory([])
            updateLoading(false)
        }
    }
    useEffect(() => {


        fetchHistory(props.type)
    }, [offset, date, error])

    const handleClose = () => {
        updateShowModal(false)
    }

    const displayModal = ({ target }) => {
        let { id } = target;
        console.log(id)
        updateImageLink(id)
        updateShowModal(true)
    }

    const doApprove = async ({ target }) => {
        setError({
            show: false,
            isError: false,
            message: ''
        })
        let { name, id } = target
        console.log(id)
        switch (name) {
            case "Approve":
                updateApproveLoading(true)
                break;
            case "Decline":
                updateDeclineLoading(true)
                break;
            default:
                break;
        }

        let result = await service.sendPut(REQUEST_LINK, { requestId: id, type: name })
        if (result.status == 200) {
            let { data } = result
            setError({
                show: true,
                isError: false,
                message: data
            })
            fetchHistory(props.type)
        } else {
            setError({
                show: true,
                isError: true,
                message: result.response.data ? result.response.data : 'An error occured'
            })
        }
        updateApproveLoading(false)
        updateDeclineLoading(false)
    }
    return (
        <HistoryStyle>
            {error.show ? (
                <ErrorDisplay message={error.message} error={error.isError} />
            ) : null}
            <Container fluid={true}>
                {loading ? (<Col lg={7} md={7} sm={7} xs={7} className="text-center">
                    <Spinner animation="border" variant="success" />
                </Col>) : (
                        <Row>
                            <Col lg={12}>
                                <Table bordered hover responsive={true}>
                                    <thead>
                                        <tr>
                                            <th>Beneficiary</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Reference</th>
                                            <th>Status</th>
                                            <th>Proof</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((request, i) => (
                                            <tr key={i}>
                                                <td>{request.requester.firstname} {request.requester.lastname}</td>
                                                <td>{request.request_type}</td>
                                                <td>${request.amount}</td>
                                                <td>{request.trans_reference}</td>
                                                <td>{request.status}</td>
                                                {request.proof !== null ? (
                                                    <td id={request.proof} onClick={displayModal}>
                                                        <Image
                                                            id={request.proof}
                                                            rounded
                                                            height=' 100px'
                                                            width='109px'
                                                            src={`${BASE_URL}${request.proof}`}
                                                        />
                                                    </td>
                                                ) : (<td>None Available</td>)}
                                                <td>{request.date}</td>
                                                {user.role.name == "Admin" ? (
                                                    <td>
                                                        <Button disabled={request.status !== "Pending" ? true : false} variant="outline-secondary" id={request.request_id} name="Approve" onClick={doApprove}>{approveLoading ? 'Loading...' : 'Approve'}</Button>
                                                        <br />
                                                        <ButtonStyle disabled={request.status !== "Pending" ? true : false} className="btn btn-success" id={request.request_id} name="Decline" onClick={doApprove}>{declineLoading ? 'Loading...' : 'Decline'}</ButtonStyle>
                                                    </td>
                                                ) : (null)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div id="page-numbers" className="pull-right">
                                    <ul className="pagination">
                                        {pages.map((page, index) => {

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
                                                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                                    <a className="page-link" id={page} onClick={pageClick} name="member">{page}</a>
                                                </li>
                                            );

                                        })}

                                    </ul>
                                </div>

                            </Col>
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{imageLink !== '' ? <Image
                                    rounded
                                    height='500px'
                                    fluid
                                    width='460px'
                                    src={`${BASE_URL}${imageLink}`}
                                /> : (
                                        <Spinner animation="border" variant="success" />

                                    )}</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={handleClose}>
                                        Close
                            </Button>

                                </Modal.Footer>
                            </Modal>

                        </Row>
                    )}
            </Container>
        </HistoryStyle>
    )
}