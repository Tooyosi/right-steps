import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image, Container } from 'react-bootstrap'
import Logo from '../../../assets/logo.png'
import Dashboard from '../../../assets/dashboard.png'
import Stages from '../../../assets/stages.png'
import Balance from '../../../assets/balance.png'
import Members from '../../../assets/members.png'
import Settings from '../../../assets/settings.png'
import Logout from '../../../assets/logout.png'
import { SidebarStyle, ToggleStyle, BackdropStyle } from '../styles/style'

export const Sidebar = () => {
    let [toggle, updateToggle] = useState(false)
    const toggleClick = () => {
        if (toggle) {
            updateToggle(false)
        } else {
            updateToggle(true)

        }
    }
    return (
        <Fragment>
            <ToggleStyle onClick={toggleClick}>
                <span></span>
                <span></span>
                <span></span>
            </ToggleStyle>
            <BackdropStyle onClick={toggleClick} Toggle={toggle}>
                <SidebarStyle Toggle={toggle}>
                    <Col lg={12} className="text-center">
                        <Image src={Logo} fluid width="100px" />
                    </Col>
                    <Col lg={12} className="text-center">
                        <Image src={Logo} roundedCircle width="120px" />
                        <h6>Mr. Tega Osemudiamen</h6>
                    </Col>
                    <Col lg={12}>
                        <ul>
                            <li className={window.location.pathname == "/dashboard"? "active" : ""}>
                                <i>
                                    <Image src={Dashboard} />
                                </i>
                                <Link to="/dashboard">
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/stages"? "active" : ""}>
                                <i>
                                    <Image src={Stages} />
                                </i>
                                <Link to="/stages">
                                    <p>Stages</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/balance"? "active" : ""}>
                                <i>
                                    <Image src={Balance} />
                                </i>
                                <Link to="/balance">
                                    <p>Balance</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/members"? "active" : ""}>
                                <i>
                                    <Image src={Members} />
                                </i>
                                <Link to="/members">
                                    <p>Members</p>
                                </Link>
                            </li>
                            <li className={window.location.pathname == "/settings"? "active" : ""}>
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
                                <Link to="">
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