import React, { Fragment, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image, Container } from 'react-bootstrap'
import Logo from '../../../assets/logo.png'
import PlacehlderImage from '../../../assets/userplaceholder.png'
import Dashboard from '../../../assets/dashboard.png'
import Stages from '../../../assets/stages.png'
import Balance from '../../../assets/balance.png'
import Members from '../../../assets/members.png'
import Settings from '../../../assets/settings.png'
import Logout from '../../../assets/logout.png'
import { SidebarStyle, ToggleStyle, BackdropStyle } from '../styles/style'
import { UserListContext } from '../Context/Context'
import { BASE_URL, LOGOUT_URL } from './links'
import WebService from './WebService'
import { default as localforage } from 'localforage';

export const Sidebar = (props) => {
    let [toggle, updateToggle] = useState(false)
    let [user] = useContext(UserListContext)

    // const toggleClick = () => {
    //     if (toggle) {
    //         updateToggle(false)
    //     } else {
    //         updateToggle(true)

    //     }
    // }

    const doLogout = async ()=>{
        let service = new WebService()
        let result = await service.sendPost(LOGOUT_URL, {userId: user.user_id})
        if(result){
            localforage.removeItem('user', (data)=>{
                window.location.replace('/')
            })
        }
    }
    return (
        <Fragment>
            <ToggleStyle onClick={props.ClickToggle}>
                <span></span>
                <span></span>
                <span></span>
            </ToggleStyle>
            <BackdropStyle onClick={props.ClickToggle} Toggle={props.Toggle}>
                <SidebarStyle Toggle={props.Toggle}>
                    <Col lg={12} className="text-center">
                        <Image src={Logo} fluid width="100px" />
                    </Col>
                    <Col lg={12} className="text-center">
                        {user.passport !== null && user.passport !== 'null' ? (
                                <Image src={`${BASE_URL}${user.passport}`} roundedCircle width="70px" height="70px" />                               
                        ) : (
                                <Image src={PlacehlderImage} roundedCircle width="70px" height="70px" />


                            )}
                        <h6>{user.gender == "Male" ? "Mr" : "Mrs"} {user.firstname} {user.lastname}</h6>
                    </Col>
                    <Col lg={12}>
                        <ul>
                            <li className={window.location.pathname == "/dashboard" ? "active" : ""}>
                                <i>
                                    <Image src={Dashboard} />
                                </i>
                                <Link to="/dashboard">
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/stages" ? "active" : ""}>
                                <i>
                                    <Image src={Stages} />
                                </i>
                                <Link to="/stages">
                                    <p>Stages</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/balance" ? "active" : ""}>
                                <i>
                                    <Image src={Balance} />
                                </i>
                                <Link to="/balance">
                                    <p>Balance</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/education" ? "active" : ""}>
                                <i>
                                    <Image src={Members} />
                                </i>
                                <Link to="/education">
                                    <p>Education</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/members" ? "active" : ""}>
                                <i>
                                    <Image src={Members} />
                                </i>
                                <Link to="/members">
                                    <p>Members</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/transactions" ? "active" : ""}>
                                <i>
                                    <Image src={Settings} />
                                </i>
                                <Link to="/transactions">
                                    <p>Transactions</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/settings" ? "active" : ""}>
                                <i>
                                    <Image src={Settings} />
                                </i>
                                <Link to="/settings">
                                    <p>Settings</p>
                                </Link>
                            </li>
                            <li>
                                <i>
                                    <Image src={Logout} />
                                </i>
                                <Link to="#" onClick={doLogout}>
                                    <p>Log Out</p>
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </SidebarStyle>
            </BackdropStyle>
        </Fragment>
    )
}