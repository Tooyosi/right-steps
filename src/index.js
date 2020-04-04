import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';
import './App.css'
import 'react-quill-2/dist/quill.snow.css';
import 'core-js';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import 'jquery';

const App = () => (
    <p>Welcome</p>
)
render(
        <Routes />

    , document.getElementById('app'))