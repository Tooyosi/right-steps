import React, { Fragment, useState } from 'react'
import { Frame } from './../../registeration/Frame'
import { SignupForm } from '../forms/Signup'
import { useContext } from 'react'
import { ReferralLiinkContext } from '../Context/Context'
import { useEffect } from 'react'
import { MEMBERS_REFERRAL_DETAILS } from '../globals/links'
import WebService from '../globals/WebService'
import { Spinner } from 'react-bootstrap'

export const Referral = (props) => {
    const { match: { params: { id } } } = props;
    const [referralID, updateReferralID] = useContext(ReferralLiinkContext)
    let [loading, updateLoading] = useState(true)
    let service = new WebService();
    if (!id) {
        return window.history.back();
    }

    const fetchReferralDetails = async () => {
        let result = await service.sendGet(`${MEMBERS_REFERRAL_DETAILS}/${id}`)
        if (result.status == 200) {
            let { data: { user: { username } } } = result;
            updateReferralID(username)
            updateLoading(false)
        } else {
            alert("An Error Occured while fetching Referral Details")
            updateLoading(false)
        }
    }
    useEffect(() => {
        fetchReferralDetails()
    }, [])
    return (
        <>
            {loading ? (
                <div className="text-center" style={{width: "100vw", height: "100vh"}}>
                    <Spinner style={{ position: "relative", top: "50%" }} animation="border" variant="success" />
                </div>

            ) : (
                    <Frame Body={SignupForm} />
                )}
        </>
    )
}
