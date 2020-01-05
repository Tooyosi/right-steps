import React, { Fragment, useState, useContext } from 'react'
import { Image, Col } from 'react-bootstrap'
import { MembersListStyle, StageDivStyle } from '../styles/style'
import Courses1 from './../../../assets/courses1.png'
import WebService from './WebService'
import { MEMBERS_LINK } from './links'
import { MemberIdContext } from '../Context/Context'
import { useEffect } from 'react'



export const Members = (props) => {
    let { Data } = props
    let [memberId, updateMemberId] = useContext(MemberIdContext)
    let service = new WebService();
    const memberClick = async({target})=>{
        let {id} = target;
        updateMemberId({id, loading: true})
        
        // let result = await service.sendGet(`${MEMBERS_LINK}/${id}`)
        
    }
    useEffect(()=>{
        
    }, [memberId])
    return (
        <Col lg={12}>
            {Data.map((item, i) => (
                <MembersListStyle key={i} id={item.user_id} onClick={memberClick} style={{backgroundColor: memberId.id == item.user_id ? "#F4D4E0" : "white"}}>
                    <div className="first" id={item.user_id}>
                        <Image id={item.user_id} src={Courses1} width="50px" roundedCircle fluid />
                        <div id={item.user_id}>
                            <b id={item.user_id}>{item.name}</b>
                            <br />
                            <small id={item.user_id}>{item.state}</small>
                        </div>
                        <div className="text-right" id={item.user_id}>
                            ...
                        </div>
                    </div>
                    <StageDivStyle Color={item.stage} id={item.user_id}>
                        <div></div>
                    </StageDivStyle>
                    <div className="bottom" id={item.user_id}>
                        <small id={item.user_id}>Stage</small>
                        <small className="text-right" id={item.user_id}>{item.stage}</small>
                    </div>
                </MembersListStyle>

            ))}
        </Col>
    )
}