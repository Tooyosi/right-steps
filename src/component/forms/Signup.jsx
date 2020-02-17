import React, { useContext, useState } from 'react';
import { RegisterFormStyle } from '../styles/style';
import { Icon } from 'react-icons-kit';
import { longArrowRight } from 'react-icons-kit/fa/longArrowRight';
import { longArrowLeft } from 'react-icons-kit/fa/longArrowLeft';
import { Spinner, Row, Col, Nav, Button, Carousel, Image, Navbar, Form, Accordion, Card } from 'react-bootstrap';
import ErrorDisplay from '../globals/Error';
import { ErrorContext, UserListContext, ReferralLiinkContext } from '../Context/Context';
import WebService from '../globals/WebService';
import { REGISTER } from '../globals/links';
import { withRouter } from 'react-router-dom'
import { default as localforage } from 'localforage';
import { useEffect } from 'react';
import { States } from '../globals/States';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
export const SignupForm = (props) => {
    const [error, setError] = useContext(ErrorContext);
    const [user, setUser] = useContext(UserListContext);
    const [formState, updateFormState] = useState(1)
    const [firstName, updateFirstName] = useState('')
    const [lastName, updateLastName] = useState('')
    const [phone, updatePhone] = useState('')
    const [email, updateEmail] = useState('')
    const [gender, updateGender] = useState('')
    const [dob, updateDOB] = useState('')
    const [lgas, updateLgas] = useState([])
    const [country, updateCountry] = useState('')
    const [state, updateState] = useState('')
    const [username, updateUsername] = useState('')
    const [password, updatePassword] = useState('')
    const [confPassword, updateConfPassword] = useState('')
    const [upline, updateUpline] = useState('')
    // const [sponsor, updateSponsor] = useState('')
    const [loading, updateLoading] = useState(false)

    // for the referral url
    const [referralID, updateReferralID] = useContext(ReferralLiinkContext);

    let service = new WebService()

    useEffect(() => {
        // let fetchStates = async ()=>{
        //     let token = await service.sendGet(`https://www.universal-tutorial.com/api/getaccesstoken`)
        //     console.log(token)
        //     let newService = new WebService()
        // } 

        // fetchStates()
    }, [])
    const submitForm = async ({ target }) => {
        let { id } = target
        switch (id) {
            case "Next":
                if (
                    firstName.trim() == "" ||
                    lastName.trim() == "" ||
                    email.trim() == "" ||
                    gender.trim() == "" ||
                    dob.trim() == "" ||
                    country.trim() == "" ||
                    phone == "" ||
                    state.trim() == ""
                ) {
                    setError({
                        show: true,
                        isError: true,
                        message: "One or more details are missing"
                    })
                } else if (phone.length < 11) {
                    setError({
                        show: true,
                        isError: true,
                        message: "Input a valid phone number"
                    })

                } else {
                    setError({
                        show: false,
                        isError: false,
                        message: ""
                    })
                    updateFormState(2);
                }
                break;
            case "Back":
                updateFormState(1);
                break;
            case "Submit":
                // submit the form
                if (
                    username.trim() == "" ||
                    upline.trim() == "" ||
                    // confPassword.trim() == "" ||
                    referralID.trim() == ""
                ) {
                    setError({
                        show: true,
                        isError: true,
                        message: "One or more details are missing"
                    })
                } else {
                    updateLoading(true)

                    setError({
                        show: false,
                        isError: false,
                        message: ""
                    })

                    let result = await service.sendPost(REGISTER, {
                        firstname: firstName,
                        lastname: lastName,
                        username: username,
                        email: email,
                        role: 2,
                        gender: gender,
                        dob: dob,
                        phone: phone,
                        country: country,
                        state: state,
                        upline: upline,
                        sponsor: referralID
                    });
                    try {
                        console.log(result)
                        if (result.status == 201) {
                            let { data } = result
                            setError({
                                show: true,
                                isError: false,
                                message: data
                            })
                            updateFormState(1);
                            updateFirstName('');
                            updateLastName('');
                            updateState('');
                            updateUsername('');
                            updatePassword('');
                            updateConfPassword('');
                            updateGender('');
                            updateDOB('');
                            updateCountry('');
                            updateReferralID('');
                            updateUpline('');
                            updateEmail('');
                            updatePhone('');
                            updateLoading(false)

                        } else {
                            setError({
                                show: true,
                                isError: true,
                                message: result.response.data ? result.response.data : 'A network error occured'
                            })
                            updateLoading(false)
                        }
                    } catch (error) {
                        setError({
                            show: true,
                            isError: true,
                            message: error.toString()
                        })
                        updateLoading(false)
                    }

                }
                break;
            default:
                break;
        }
    }

    const handleChange = ({ target }) => {
        let { name, value } = target;
        switch (name) {
            case "firstname":
                updateFirstName(value);
                break;
            case "lastname":
                updateLastName(value);
                break;
            case "phone":
                updatePhone(value);
                break;
            case "email":
                updateEmail(value);
                break;
            case "gender":
                updateGender(value);
                break;
            case "dob":
                updateDOB(value);
                break;
            case "country":
                updateCountry(value);
                break;
            case "state":
                updateState(value);
                break;
            case "username":
                updateUsername(value);
                break;
            case "password":
                updatePassword(value);
                break;
            case "confPassword":
                updateConfPassword(value);
                break;
            case "upline":
                updateUpline(value);
                break;
            case "sponsor":
                updateReferralID(value);
                break;
            default:
                break;
        }
    }

    const handleCountryChange = (e) => {
        updateCountry(e);
    }

    const handleStateChange = (e) => {
        updateState(e);

    }
    return (

        <RegisterFormStyle>
            <Form>
                <Row>
                    <Col lg={12}>
                        {error.show ? (
                            <ErrorDisplay message={error.message} error={error.isError} />
                        ) : null}
                    </Col>
                </Row>
                <Row style={{ display: formState == 1 ? "flex" : "none" }}>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={firstName} onChange={handleChange} type="text" placeholder="Firstname" name="firstname" />
                        </Form.Group>
                    </Col>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={lastName} onChange={handleChange} type="text" placeholder="Lastname" name="lastname" />
                        </Form.Group>
                    </Col>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={phone} onChange={handleChange} type="number" placeholder="Phone number" name="phone" min="0" pattern="[0-9]+" />
                        </Form.Group>
                    </Col>
                    <Col lg={12} >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={handleChange} type="email" placeholder="Email address here" name="email" />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control value={gender} onChange={handleChange} as="select" name="gender">
                                <option defaultValue>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control value={dob} onChange={handleChange} type="date" name="dob" />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        {/* <Form.Group>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control value={country} onChange={handleChange} as="select" name="country">
                                <option defaultValue>Select Nationality</option>
                                <option>Nigerian</option>
                            </Form.Control>
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Label>Nationality</Form.Label>
                            <CountryDropdown
                                className="form-control"
                                value={country}
                                name="country"
                                onChange={handleCountryChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>State Of Origin</Form.Label>
                            {/* <Form.Control value={state} onChange={handleChange} as="select" name="state">
                                <option defaultValue>Select State</option>
                                <option>Nigerian</option>
                            </Form.Control> */}
                            <RegionDropdown
                                className="form-control"
                                country={country}
                                value={state}
                                onChange={handleStateChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={{ display: formState == 2 ? "inherit" : "none" }}>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={handleChange} type="text" placeholder="username" name="username" />
                        </Form.Group>
                    </Col>
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Upline Username</Form.Label>
                            <Form.Control value={upline} onChange={handleChange} type="text" placeholder="Upline Username" name="upline" />
                        </Form.Group>
                    </Col>
                    {/* <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control value={confPassword} onChange={handleChange} type="password" placeholder="Confirm password" name="confPassword" />
                        </Form.Group>
                    </Col> */}
                    <Col lg={12}>
                        <Form.Group>
                            <Form.Label>Sponsor Username</Form.Label>
                            <Form.Control value={referralID} onChange={handleChange} type="text" placeholder="Sponsor Username" name="sponsor" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>

                    <Col>
                        {formState == 1 ? (
                            <Button style={{ float: "right" }} onClick={submitForm} id="Next">
                                <span style={{ marginRight: "5px" }} onClick={submitForm} id="Next">
                                    Next
                    </span>
                                <Icon size={'15px'} icon={longArrowRight} onClick={submitForm} id="Next" />
                            </Button>

                        ) : (
                                <>
                                    <Button onClick={submitForm} id="Back">
                                        <Icon size={'15px'} icon={longArrowLeft} onClick={submitForm} id="Back" />
                                        <span style={{ marginLeft: "5px" }} onClick={submitForm} id="Back">
                                            Back
                </span>
                                    </Button>
                                    {loading ? (
                                        <>
                                            <Button style={{ float: "right" }} id="Submit">

                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span>
                                                    Loading ....
                                         </span>
                                            </Button>
                                        </>
                                    ) : (
                                            <Button style={{ float: "right" }} onClick={submitForm} id="Submit">Submit</Button>
                                        )}
                                </>
                            )}
                    </Col>
                </Row>
            </Form>
        </RegisterFormStyle>
    )
}