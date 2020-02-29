/*!

=========================================================
* BLK Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Index from "views/Index.jsx";
import ProductPage from "views/examples/ProductPage.jsx";
import RequestPage from "views/examples/RequestPage.jsx";
import ProfilePage from "views/examples/ProfilePage.jsx";
import ContactPage from "views/examples/contact.jsx";
import AdminLoginPage from "views/examples/AdminLoginPage.jsx";
import  AdminPage from "views/examples/AdminPage.jsx";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <BrowserRouter>
   <CookiesProvider>
    <Switch>
  
      <Route path="/components" render={props => <Index {...props} />} />
      <Route
        path="/product-page"
        render={props => <ProductPage {...props} />}
      />
      <Route
        path="/request-page"
        render={props => <RequestPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />
       <Route
        path="/contact-page"
        render={props => <ContactPage {...props} />}
      />
        <Route
        path="/admin-login"
        render={props => <AdminLoginPage {...props} />}
      />
        <Route
        path="/admin-page"
        render={props => <AdminPage {...props} />}
      />
      <Redirect from="/" to="/components" />
    
    </Switch>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
