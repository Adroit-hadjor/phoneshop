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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledCarousel,
  CardImg,
  Card,
} from "reactstrap";
import { withCookies } from 'react-cookie';

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      users:[],
      items:[],
      itemId:[],
      token: this.props.cookies.get('mr-token'),
    };
  }

  
  componentDidMount() {

    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    console.log(this.state.token);
   if(this.state.token){
      fetch(`${process.env.REACT_APP_API_URL}/api/users/0/get_userdetails/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        }
      }).then( resp => resp.json())
      .then(res =>  {this.setState({users:res.result}, this.getPayment)})
      .then(console.log(this.state.users))
      .catch( error => console.log(error))


    
     console.log(this.state.users)

     
    } else {
      window.location.href = '/';
    }

    
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
    // ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");

  
  
  }

  getPayment(){
    fetch(`${process.env.REACT_APP_API_URL}/api/payments/heal/getPayment/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.state.token}`
      }
    }).then( resp => resp.json())
    .then(res => this.setState({items:res},this.getitem))
    .catch( error => console.log(error))
  }

  getitem(){
    console.log(this.state.items)
    {this.state.items.map( ite => {
      return(
    
        fetch(`${process.env.REACT_APP_API_URL}/api/items/${ite.item}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${this.state.token}`
          }
        }).then( resp => resp.json())
        .then(res => this.setState({itemId: [...this.state.itemId, res]}))
        .catch( error => console.log(error))
    
 )
   })}
    
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
  

    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
           <Container>
           { this.state.users.map( user => {
                return (
              <Row className="justify-content-between">
                <Col md="6">
                 
               
                
                  <Row className="justify-content-between align-items-center">
                  <div>
           
                    <div key={user.id} className="">
                    <Row className="justify-content-between align-items-center">
                    <h3>Name:{user.fullname}</h3>
                   
                  </Row>
                    <Row>
                        <h3>
                           location: {user.location}
                         
                        </h3>
                     </Row>
                     <Row>
                        <h3>
                     phone number: {user.phone_no}
                      
                     </h3>
                     </Row>
                    
                       
                     
                    </div>
         
           
        </div>
                  
                  </Row>
                
                </Col>
              
                 
               
              </Row>
                     )
                    })}
            </Container>
          </div>
          <div className="section">
            <Container>
              <Col md="6">
            <h1 className="profile-title text-left">Items Purchased</h1>
                  <h5 className="text-on-back">SikaStreet</h5>
                  {this.state.itemId.map( item => {
                        return(
                          <Row key={item.id}>
                          <Card>
                           <CardImg width="100%" style={{height:300}}  src={item.img} alt={"d"} />
                           </Card>
                        <h3>
                    <p>{item.name}<br></br>
                        description: {item.description}<br></br> 
                        price: {item.price} <br></br>
                        <row> type: {item.type}</row> 
                      </p>
                     </h3>
                     
                     </Row>)
                     })}
                     </Col>
            </Container>
          </div>
         
          <Footer />
        </div>
      </>
    );
  }
}

export default withCookies(ProfilePage);
