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