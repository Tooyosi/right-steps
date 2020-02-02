import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const NoMatch = (props) => {
    const goBack = (e) => {
        e.preventDefault();
        props.history.goBack()
    }
    return (
            <div className="container text-center">
                <h1 className="head"><span>404</span></h1>
                <p>Oops! The Page you requested was not found!</p>
                <button  className="btn btn-success btn-outline" onClick={goBack}> Go Back</button>
            </div>

    )
}

export default withRouter(NoMatch);