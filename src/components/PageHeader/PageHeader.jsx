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

// reactstrap components
import { Container } from "reactstrap";

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
   
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">SIKASTREET•</h1>
            <h6 className="d-none d-sm-block">
              Get The Best Original Phones And Other Techs At An Affordable Price. 
            </h6>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
