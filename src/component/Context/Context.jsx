import React, { useState, createContext } from 'react';

export const MemberIdContext = createContext();


export const MemberIdProvider = (props) => {
        const [memberId, updateMemberId] = useState({
            id: '',
            loading: false
        });
        return (
            <MemberIdContext.Provider value={[memberId, updateMemberId]}>
                {props.children}
            </MemberIdContext.Provider>
        );
}

export const ErrorContext = createContext();

export const ErrorProvider = (props) => {
    const [error, setError] = useState({
        show: false,
        message: "",
        isError: false
    })
    return (
        <ErrorContext.Provider value={[error, setError]}>
            {props.children}
        </ErrorContext.Provider>
    );
}

export const UserListContext = createContext();

export const UserListProvider = (props) => {
    const [userList, setUserList] = useState('')
    return (
        <UserListContext.Provider value={[userList, setUserList]}>
            {props.children}
        </UserListContext.Provider>
    );
}
export const ReferralLiinkContext = createContext();

export const ReferralLiinkProvider = (props) => {
    const [referralID, updateReferralID] = useState('')
    return (
        <ReferralLiinkContext.Provider value={[referralID, updateReferralID]}>
            {props.children}
        </ReferralLiinkContext.Provider>
    );
}