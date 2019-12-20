import React, { Fragment, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { SkeletonStyle, DashboardStyle, ButtonStyle, MembersListStyle, StageDivStyle, PersonalStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import Courses2 from './../../../assets/courses2.png'
import { Members } from './Members'



export const Skeleton = (props) => {
    let {Body} = props

    return (
        <Container fluid={true}>
            <Row>
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col lg={10} md={12}>
                    <SkeletonStyle>
                        <Body/>
                    </SkeletonStyle>
                </Col>

            </Row>
        </Container>
    )
}