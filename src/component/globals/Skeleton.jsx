import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from './Members'
import { UserListContext } from '../Context/Context'
import { default as localforage } from 'localforage';
import { withRouter } from 'react-router-dom'



const Skeleton = (props) => {
    let { Body } = props
    const [user, setUser] = useContext(UserListContext);
    const [isLoading, updateIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            let userDetails = await localforage.getItem('user')
            if (userDetails !== null || userDetails !== undefined) {
                setUser(userDetails)
                updateIsLoading(false)
            } else {
                props.history.push('/')
            }
        };
        getUser();
    }, [])
    return (
        <Container fluid={true}>
            <Row>
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col lg={10} md={12}>
                    {isLoading ? (
                        <Row>
                            <Col className="text-center" style={{ height: "100vh" }} lg={12}>

                                <Spinner style={{ position: "relative", top: "50%" }} animation="border" variant="success" />
                            </Col>
                        </Row>
                    ) : (
                            <SkeletonStyle>
                                <Body />
                            </SkeletonStyle>
                        )}

                </Col>


            </Row>
        </Container>
    )
}

export default withRouter(Skeleton)