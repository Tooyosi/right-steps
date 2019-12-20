import React, { Fragment, useState } from 'react'
import { Frame } from './Frame'
import { SignupForm } from '../component/forms/Signup'

export const Signup = ()=>{
    return(
        <Frame Body={SignupForm}/>
    )
}
