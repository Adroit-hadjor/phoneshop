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

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "components/PageHeader/PageHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
import Carousel from "views/IndexSections/Carousel.jsx";
import Airpodscarousel from "views/IndexSections/airpodscarousel.jsx";
// sections for this page/view

import Signup from "views/IndexSections/Signup.jsx";
import { withCookies } from 'react-cookie';


class Index extends React.Component {
  state = {
    token: this.props.cookies.get('mr-token'),
  }
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <PageHeader />
         
          <div className="main">
          { this.state.token ? '' :  <Signup   /> }
         
          <Carousel/>
          <Airpodscarousel/>
           
           
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default withCookies(Index);
