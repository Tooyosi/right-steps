import React, { Fragment, useState } from 'react'
import { Frame } from './Frame'
import SignInForm  from '../component/forms/SignIn'

export const Login = ()=>{
    return(
        <Frame Body={SignInForm}/>
    )
}
