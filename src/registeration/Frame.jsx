import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { FormsFrame } from '../component/styles/style'
import Logo from '../../assets/logo.png'
import { SignupForm } from '../component/forms/Signup'


export const Frame = (props)=>{
    let {Body} = props
    return(
        <FormsFrame>
            <Container fluid={true}>
                <Row>
                    <Col className="image" lg={6} md={6} sm={2} xs={0}>
                        <Image src={Logo} roundedCircle/>
                    </Col>
                    <Col className="form" lg={6} md={6} sm={10} xs={12}>
                        <Body/>
                    </Col>
                    <Col lg={12}>
                        <p>{"\u00a9"} Right Steps Foundation</p>
                    </Col>
                </Row>
            </Container>
        </FormsFrame>
    )
}   
