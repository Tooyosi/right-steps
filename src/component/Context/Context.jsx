import React, { useState, createContext } from 'react';

export const RegisterContext = createContext();


export const RegisterProvider = (props) => {
        const [register, updateRegister] = useState({
            name: '',
            email: '',
            gender: '',
            dob: '',
            country: '',
            state: '',
            username: '',
            password: '',
            sponsor: ''
        });
        return (
            <RegisterContext.Provider value={[register, updateRegister]}>
                {props.children}
            </RegisterContext.Provider>
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
    // const [filtered, setFiltered] = useState([])
    const [userList, setUserList] = useState('')
    return (
        <UserListContext.Provider value={[userList, setUserList]}>
            {props.children}
        </UserListContext.Provider>
    );
}