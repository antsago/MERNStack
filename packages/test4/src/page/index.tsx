import React from 'react';
import ReactDOM from "react-dom";
import App from './App';

const mountNode = document.getElementById("app");

const app = <App name="Hidrated" />
ReactDOM.hydrate(app, mountNode)
