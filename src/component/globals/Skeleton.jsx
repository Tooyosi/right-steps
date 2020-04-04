import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import { UserListContext } from '../Context/Context'
import { default as localforage } from 'localforage';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';


const BodyStyle1 = styled.div`
width: 15%

@media(max-width: 1395px){
    width: 8%
}
`
const BodyStyle2 = styled.div`
width: 80%
margin-left: 3%;
@media(max-width: 1395px){
    width: 92%
}
`

const Skeleton = (props) => {
    let { Body } = props
    const [user, setUser] = useContext(UserListContext);
    const [isLoading, updateIsLoading] = useState(true);
    let [toggle, updateToggle] = useState(false)

    const setToggle = ()=>{
        updateToggle(!toggle)
    }
    useEffect(() => {
        const getUser = async () => {
            let userDetails = await localforage.getItem('user')
            if (userDetails !== null && userDetails !== undefined) {
                setUser(userDetails)
                updateIsLoading(false)
            } else {
                return props.history.push('/')
            }
        };
        getUser();
    }, [])
    return (
        <Container fluid={true}>
            <Row>
                
                <BodyStyle1>
                    <Sidebar Toggle={toggle} ClickToggle={setToggle} />
                </BodyStyle1>
                <BodyStyle2>
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

                </BodyStyle2>


            </Row>
        </Container>
    )
}

export default withRouter(Skeleton)