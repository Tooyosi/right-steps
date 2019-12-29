import React, { Fragment, useState } from 'react'
import { Image, Col } from 'react-bootstrap'
import { MembersListStyle, StageDivStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'



export const Members = (props) => {
    let { Data } = props
    return (
        <Col lg={12}>
            {Data.map((item, i) => (
                <MembersListStyle key={i}>
                    <div className="first">
                        <Image src={Courses1} width="50px" roundedCircle fluid />
                        <div>
                            <b>{item.name}</b>
                            <br />
                            <small>{item.state}</small>
                        </div>
                        <div className="text-right">
                            ...
                        </div>
                    </div>
                    <StageDivStyle Color={item.stage}>
                        <div></div>
                    </StageDivStyle>
                    <div className="bottom">
                        <small>Stage</small>
                        <small className="text-right">{item.stage}</small>
                    </div>
                </MembersListStyle>

            ))}
        </Col>
    )
}