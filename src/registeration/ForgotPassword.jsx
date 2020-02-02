import React, { Fragment, useState } from 'react'
import { Frame } from './Frame'
import ForgotForm  from '../component/forms/ForgotForm'

export const ForgotPassword = ()=>{
    return(
        <Frame Body={ForgotForm}/>
    )
}
