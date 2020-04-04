import React, { Fragment, useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Spinner, Form, Button, Table } from 'react-bootstrap'
import { RegisterFormStyle } from '../styles/style'
import { Members } from '../globals/Members'
import { MEMBERS_LINK, USER_LINK, ADMIN_MEMBERS_LINK, USER_SEARCH_LINK, USER_TRANSFER_LINK } from '../globals/links'
import { UserListContext, ErrorContext } from '../Context/Context'
import WebService from '../globals/WebService'
import Tree from 'react-hierarchy-tree';
import ErrorDisplay from '../globals/Error';
import { Icon } from 'react-icons-kit'
import { longArrowRight } from 'react-icons-kit/fa/longArrowRight'
import { default as localforage } from 'localforage';

const FundTransfer = (props) => {
    let [user, setUser] = useContext(UserListContext);
    const [error, setError] = useContext(ErrorContext);
    let [firstname, updateFirstname] = useState('');
    let [lastname, updateLastname] = useState('');
    let [dob, updateDob] = useState('');
    let [image, updateImage] = useState('')
    let [gender, updateGender] = useState('')
    let [phone, updatePhone] = useState('')
    let [bankName, updateBankName] = useState('')
    let [accountName, updateAccountName] = useState('')
    let [accountNumber, updateAccountNumber] = useState('')
    let [loading, updateLoading] = useState(false)
    let [userLoading, updateUserLoading] = useState(false)
    let [accountLoading, updateAccountLoading] = useState(false)
    let [offset, updateOffset] = useState(0)
    let [memberCurrentPage, updateMemberCurrentPage] = useState(1)
    let [memberTotalPages, updateMemberTotalPages] = useState('')

    let [searchTerm, updateSearchTerm] = useState('')
    let [memberSearchResult, updateMemberSearchResult] = useState([])
    let [emptyMemberMessage, updateEmptyMemberMessage] = useState()
    let [table, updateTable] = useState()
    let [enableSearch, updateEnableSearch] = useState(false)


    let [active, updateActive] = useState(1)

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
        if (memberCurrentPage > !memberStartPage) {
            let newPageNo = memberCurrentPage + 1
            let newSkipValue = 10 + offset
            updateMemberCurrentPage(newPageNo)
            updateOffset(newSkipValue)
        }

    }

    const handleMoveLeft = (evt) => {
        evt.preventDefault();
        if (memberStartPage > !memberCurrentPage) {
            let newPageNo = memberCurrentPage - 1
            let newSkipValue = offset - 10
            updateMemberCurrentPage(newPageNo)
            updateOffset(newSkipValue)
        }


    }

    const memberPages = fetchPageNumbers(memberTotalPages, memberStartPage, memberEndPage);


    const pageClick = (e) => {
        e.preventDefault();

        let { id, name } = e.target
        if (id != memberCurrentPage) {
            let newPageNo = Number(id)
            let newSkipValue = 10 * (newPageNo - 1)
            updateMemberCurrentPage(newPageNo)
            updateOffset(newSkipValue)
            // fetchMembers("")
        }
    }

    let service = new WebService();
    let [accountInfo, updateAccountInfo] = useState([])
    const fetchMember = async () => {
        updateLoading(true)
        let result = await service.sendGet(`${MEMBERS_LINK}/${user.user_id}`)
        let { data } = result
        updateAccountInfo(data)
        updateLoading(false)

    }

    const fetchFundsMember = async () => {
        if (searchTerm.trim() == "") {
            setError({
                show: true,
                isError: true,
                message: 'Search field is empty'
            })
        } else {
            setError({
                show: false,
                isError: false,
                message: ''
            })
            updateLoading(true)
            let result = await service.sendGet(`${USER_SEARCH_LINK}/${searchTerm}?offset=${offset}`)
            let { data: { rows, count } } = result
            if (rows.length > 0) {
                updateMemberSearchResult(rows)
                let pages = Math.ceil(Number(count) / 10)
                updateMemberTotalPages(pages)
            } else {
                updateMemberSearchResult([])
                updateEmptyMemberMessage(`${searchTerm.toLocaleUpperCase()} not found`);
            }
            updateLoading(false)
        }
    }
    useEffect(() => {
        setError({
            show: false,
            isError: false,
            message: ''
        })
        if (active == 2) {

            fetchMember()
        }
        if (active == 3) {

        }

        if (searchTerm != "") {
            fetchFundsMember()
        }
    }, [active, offset])

    const submitForm = async (e) => {
        e.preventDefault()
        let { id } = e.target
        
    }

    const handleChange = ({ target }) => {
        let { name, value } = target;
        switch (name) {
            case "firstname":
                updateFirstname(value)
                break;
            case "lastname":
                updateLastname(value)
                break;
            case "image":
                updateImage(target.files[0])
                break;
            case "gender":
                updateGender(value)
                break;
            case "dob":
                updateDob(value)
                break;
            case "phone":
                updatePhone(value)
                break;
            case "accountNumber":
                updateAccountNumber(value)
                break;
            case "accountName":
                updateAccountName(value)
                break;
            case "bankName":
                updateBankName(value)
                break;
            case "searchTerm":
                updateSearchTerm(value)
                break;
            default:
                break;
        }
    }


    const fundUserAccount = async (e) => {
        e.preventDefault();
        e.persist();
        let { number } = table
        let { id } = e.target
        let amountValue, receiverName
        if (number.length > 1) {
            number.forEach((num) => {
                if (id == num.dataset.id) {
                    amountValue = num.value
                    receiverName = num.dataset.name
                }
            })
        } else {

            amountValue = number.value
            receiverName = number.dataset.name
        }
        if (amountValue == undefined || amountValue.trim() == "") {
            setError({
                show: true,
                isError: true,
                message: 'Amount Can not be empty'
            })
        } else if (amountValue < 1) {
            setError({
                show: true,
                isError: true,
                message: 'Amount Can not be less than $1'
            })
        } else {
            setError({
                show: false,
                isError: false,
                message: ''
            })

            let conf = confirm(`Continue transfer to ${receiverName}? This action can not be reversed`)
            if (conf) {
            updateEnableSearch(true)

                let dataToSend = {
                    senderId: user.user_id,
                    senderName: `${user.firstname} ${user.lastname}`,
                    receiverName: receiverName,
                    amount: amountValue
                }

                e.target.value = "Sending..."
                e.target.disabled = true
                let result = await service.sendPost(`${USER_TRANSFER_LINK}/${id}`, dataToSend)
                if (result.status == 200) {
                    let { data } = result
                    setError({
                        show: true,
                        isError: false,
                        message: data
                    })
                    if (number.length > 1) {
                        number.forEach((num) => {
                            if (id == num.dataset.id) {
                                num.value = 0
                            }
                        })
                    } else {
                        number.value = 0
                    }
                } else {
                    setError({
                        show: true,
                        isError: true,
                        message: result.response ? result.response.data : 'An error occured'
                    })
                }
                e.target.disabled = false
                updateEnableSearch(false)
            }
        }
    }
    return (
        <Row>
            {loading ? (
                <Col className="text-center">
                    <Spinner animation="border" variant="success" />

                </Col>
            ) : (
                    <>
                        <Col lg={12}>

                            <Container fluid={true}>
                                
                               <RegisterFormStyle>

                                    <Col>
                                        {error.show ? (
                                            <ErrorDisplay message={error.message} error={error.isError} />
                                        ) : null}
                                    </Col>
                                    <Container fluid={true}>
                                        <Row>

                                            <Col lg={6} md={6} sm={6}>
                                                <Form onSubmit={submitForm}>
                                                    <Row>
                                                        <Col lg={8} >
                                                            <Form.Group>
                                                                {/* <Form.Label>Bank Name</Form.Label> */}
                                                                <Form.Control type="search" placeholder="Search by name or username" value={searchTerm} name="searchTerm" onChange={handleChange} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <input type="button" className="btn btn-success" value={searchTerm.trim() != "" ? `Search for ${searchTerm}` : `Search`} disabled={enableSearch} onClick={fetchFundsMember} />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                            <Col lg={12} md={12} sm={12}>
                                                <form ref={table => updateTable(table)} onSubmit={fundUserAccount}>
                                                    <Table striped responsive hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Firstname</th>
                                                                <th>Lastname</th>
                                                                <th>Username</th>
                                                                <th>Amount</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {memberSearchResult.length != 0 ? (
                                                                <>
                                                                    {memberSearchResult.map((member, i) => (
                                                                        <tr key={i}>
                                                                            <td>{member.firstname}</td>
                                                                            <td>{member.lastname}</td>
                                                                            <td>{member.username}</td>
                                                                            <td style={{ display: member.user_id == user.user_id ? 'none' : '' }}>
                                                                                <Form.Control style={{ width: "70px" }} type="number" name="number" min="0" data-id={member.user_id} data-name={`${member.firstname} ${member.lastname}`} className={member.user_id} placeholder="Amount" onChange={handleChange} />
                                                                            </td>
                                                                            <td style={{ display: member.user_id == user.user_id ? 'none' : '' }}>
                                                                                <input type="button" className="btn btn-success" value="Send" id={member.user_id} onClick={fundUserAccount} />
                                                                            </td>
                                                                        </tr>
                                                                    ))}

                                                                </>
                                                            ) : (
                                                                    <>
                                                                        {emptyMemberMessage == null ? (null) : (
                                                                            <tr>
                                                                                <td>{emptyMemberMessage}</td>
                                                                            </tr>
                                                                        )}
                                                                    </>

                                                                )}
                                                        </tbody>
                                                    </Table>
                                                    <div id="page-numbers" className="pull-right">
                                                        <ul className="pagination">
                                                            {memberPages.map((page, index) => {

                                                                if (page === LEFT_PAGE) return (
                                                                    <li key={index} className="page-item" onClick={handleMoveLeft} name="member">
                                                                        <a className="page-link" aria-label="Previous" onClick={handleMoveLeft} name="member">
                                                                            <span aria-hidden="true">&laquo;</span>
                                                                            <span className="sr-only">Previous</span>
                                                                        </a>
                                                                    </li>
                                                                );

                                                                if (page === RIGHT_PAGE) return (
                                                                    <li key={index} className="page-item" onClick={handleMoveRight} name="member">
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

                                                </form>

                                            </Col>
                                        </Row>
                                    </Container>
                                </RegisterFormStyle>

                            </Container>
                        </Col>
                    </>
                )}
        </Row>

    )
}

export default withRouter(FundTransfer);