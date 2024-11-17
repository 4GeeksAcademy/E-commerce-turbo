import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/index.css";
import Layout from "./layout";


require('dotenv').config();
 const root = ReactDOM.createRoot(document.getElementById('app'));






//render your react application
 root.render(<Layout />);

//  ReactDOM.render(<Layout />, document.querySelector("#app"));
