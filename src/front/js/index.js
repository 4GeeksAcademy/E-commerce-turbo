//import react into the bundle
import React from "react";
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//  const container = document.querySelector("#app");
//  const root = createRoot(container);

 const root = ReactDOM.createRoot(document.getElementById('app'));






//render your react application
 root.render(<Layout />);

//  ReactDOM.render(<Layout />, document.querySelector("#app"));
