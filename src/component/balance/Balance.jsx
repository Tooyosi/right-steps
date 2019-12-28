import React, { Fragment, useState } from 'react'
import Skeleton from "../globals/Skeleton";
import { Body } from "./Body";

export const Balance = ()=>{
    return(
        <Fragment>
            <Skeleton Body={Body} />
        </Fragment>
    )
}