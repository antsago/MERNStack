import * as React from 'react';
import * as ReactDOM from "react-dom";
import App from './App';

const mountNode = document.getElementById("app");
const app = <App name="Me" />
if (process.env.NODE_ENV === "development") {
  ReactDOM.render(app, mountNode);
} else {
  ReactDOM.hydrate(app, mountNode)
}