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

// react plugin used to create datetimepicker
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

const carouselItems = [
  {
    src: require("assets/img/a.jpg"),
    altText: "Slide 1",
    caption: ""
  },
  {
    src: require("assets/img/e.jpg"),
    altText: "Slide 2",
    caption: ""
  },
  {
    src: require("assets/img/99.jpg"),
    altText: "Slide 3",
    caption: ""
  }
];

class JavaScript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoModal: false,
      miniModal: false,
      formModal: false
    };
  }
  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  render() {
    return (
      <div className="section section-javascript" id="javascriptComponents">
        <img alt="..." className="path" src={require("assets/img/path5.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path5.png")}
        />
       
        <div className="section">
          <Container>
          
            <Row className="justify-content-between align-items-center">
            <Col lg="6">
                <UncontrolledCarousel
                  items={carouselItems}
                  indicators={false}
                  autoPlay={false}
                />
              </Col>
             
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-white font-weight-light">
                  GET THE ACCESSORIES•
                </h1>
                <p className="text-white mt-4">
                  We have the latest accessories like airpods,gamepads,game cds ,e.t.c, make a order and have it delivered to you in a second.
                </p>
                <Link to="/product-page">
                <Button
                  className="mt-4"
                  color="warning"
                  
                >
                 Check latest accessories
                </Button>
                </Link>
              </Col>
              
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default JavaScript;
