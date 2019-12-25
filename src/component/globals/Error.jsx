import React from 'react';

const ErrorDisplay = (props)=>{
    let {message, error} = props
    return(
        <div className={error ? "alert alert-danger alert-dismissible" : "alert alert-success alert-dismissible"}>
            {message}
        </div>
    )
}

export default ErrorDisplay;