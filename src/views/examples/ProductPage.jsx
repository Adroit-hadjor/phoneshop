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
// react plugin used to create charts
import { Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import classnames from "classnames";
// reactstrap components

import {
  FormGroup,
  Button,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";


class ProductPage extends React.Component {
constructor(props){
  super(props);
  this.state = {
  items:[],
  type:null,
  selectedItem: null,
  token: this.props.cookies.get('mr-token'),
  formModal: false,
  numberModal:false,
  credentials: {
    username: '',
    password: ''
},
isLoginView: true,
}

this.baseState = this.state;
this.changeType = this.changeType.bind(this);

}

  componentDidMount() {
    document.body.classList.toggle("landing-page");
    fetch(`${process.env.REACT_APP_API_URL}/api/items/`, {
      method: 'GET',
    }).then( resp => resp.json())
    .then(res => this.setState({items:res}))
    .then(res => console.log(res))
    .catch( error => console.log(error))

  if(this.state.token !==null){
   
  }
  }
  componentWillUnmount() {

  }
 
  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };

  inputChanged = event => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
}

handleOnClick = (event) => {
  //.current is verification that your element has rendered
  if(this.myDivToFocus.current){
      this.myDivToFocus.current.scrollIntoView({ 
         behavior: "smooth", 
         block: "nearest"
      })
  }
}


login = event => {
    if(this.state.isLoginView) {
        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => {
                this.toggleModal();
                this.props.cookies.set('mr-token', res.token);
                window.location.href = "/product-page";
               
            })
            .catch( error => console.log(error))
    } else {
        fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => {
                this.setState({isLoginView: true});
            })
            .catch( error => console.log(error))
    }
}

  changeType = (devType) => {
   
    this.setState({type:devType},this.getType)
    
   
   
  }
  getType(){
    if(this.state.type === 'iphone' ){
      fetch(`${process.env.REACT_APP_API_URL}/api/items/1/getProductType/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({type:this.state.type})
      }).then( resp => resp.json())
      .then(res => this.setState({items:res}))
      .then(res => console.log(res))
      .catch( error => console.log(error))
    }
    else if(this.state.type === 'android' ){
      fetch(`${process.env.REACT_APP_API_URL}/api/items/1/getProductType/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({type:this.state.type})
      }).then( resp => resp.json())
      .then(res => this.setState({items:res}))
      .then(res => console.log(res))
      .catch( error => console.log(error))
    }
    else if(this.state.type === 'accessories' ){
      fetch(`${process.env.REACT_APP_API_URL}/api/items/1/getProductType/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({type:this.state.type})
      }).then( resp => resp.json())
      .then(res => this.setState({items:res}))
      .then(res => console.log(res))
      .catch( error => console.log(error))
    }
    else if(this.state.type === null ){
      fetch(`${process.env.REACT_APP_API_URL}/api/items/`, {
        method: 'GET',
      }).then( resp => resp.json())
      .then(res => this.setState({items:res}))
      .then(res => console.log(res))
      .catch( error => console.log(error))
    }
  }

  loadItem = (item) => {
    console.log(this.state.token);
    if(this.state.token === undefined){
      alert("Please login to buy item");
      this.toggleModal("formModal");
    }
    else{
    this.setState({selectedItem: item});
    this.toggleModal("numberModal");
    fetch(`${process.env.REACT_APP_API_URL}/api/items/${item.id}/payme/`, {
      method: 'POST',
      headers: { 
        'Authorization': `Token ${this.state.token}`,
        'Content-Type': 'application/json'},
    
    }).then( resp => resp.json())
    .then(res => console.log(res))
    .catch( error => console.log(error))
  }
  }
 
  render() {
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
        <section className="section section-lg">
          <div  className="justify-content-between align-items-center"  >
          
            <div className="content-center">
            <Container style={{paddingTop:100}}>
              <Row className="row-grid justify-content-between align-items-center text-left">
                <Col lg="6" md="6">
                  <h1 className="text-white">
                   Get The Best Phones
                   
                  </h1>
                  <p className="text-white mb-3">
                   SikaStreet
                  </p>
                 
                 
                  <div className="btn-wrapper">
                    <div className="button-container">
                    <Button
                        className="btn-icon btn-simple btn-round btn-neutral"
                        color="default"
                        href="#pablo"
                        onClick={e => {e.preventDefault();this.changeType(null);}}

                      >
                          <p style={{padding:5}}>All</p>
                      </Button>
                      <Button
                        className="btn-icon btn-simple btn-round btn-neutral"
                        color="default"
                        href="#pablo"
                        onClick={e => {e.preventDefault();this.changeType('iphone');}}
                      >
                        <i className="fab fa-apple" />
                      </Button>
                      <Button
                        className="btn-icon btn-simple btn-round btn-neutral"
                        color="default"
                        href="#pablo"
                        onClick={e => {e.preventDefault();this.changeType('android');}}
                      >
                        <i className="fab fa-android" />
                      </Button>
                     
                    </div>
                  </div>
                </Col>
               
              </Row>
              <Row>
              <Button
                  className="mt-4"
                  color="warning"
                  onClick={()=>{this.changeType('accessories');}}
                >
                View Our Accessories
                </Button>
              </Row>
              </Container>
             

              
            </div>
          </div>
         
         
         
           
            <Container style={{paddingTop:100}}>
              

           

              <Row className="justify-content-center">
                <Col lg="12">
                <div>
            { this.state.items.map( item => {
                return (
                <li>
                  <Row key={item.id} className="row-grid justify-content-center">
                    <Col lg="5">
                    <Card >
                <Link to={`/product-page`} >
                    <CardImg width="100%" style={{height:300}}  src={item.img} alt={"d"} />
                    <CardImgOverlay style={{color:'white'}}>
                        <CardTitle><p><h2> {item.name}</h2></p></CardTitle>                     
                    </CardImgOverlay>
                </Link>
            </Card>
                    </Col>
                    <Col lg="5">
                    <p><h3>description: {item.description} </h3></p>
                         <p>price: {item.price} </p>
                         <p>type: {item.type} </p>
                         <Button
                  className="mt-4"
                  color="warning"
                  onClick={()=>{this.loadItem(item);}}
                >
                 Buy Now
                </Button>
                    </Col>
                   
                  </Row>
                  </li> )
                      })}
                     
                  </div>
                </Col>


                
                  {/* Start Form Modal */}
           <Modal
              modalClassName="modal-black"
              isOpen={this.state.numberModal}
              toggle={() => this.toggleModal("numberModal")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("numberModal")}
                >
                  <i className="tim-icons icon-simple-remove text-white" />
                </button>
               
              </div>
              <div className="modal-body">
                <div className="btn-wrapper text-center">
                
                </div>
                <div className="text-center text-muted mb-4 mt-3">
                 <p style={{color:"white"}} >Call 0244215905 to make an order 
                 Or send mobile money to 0244215905 to purchase this product.</p>
                 <p style={{color:"white"}} >Go to your profile to see purchased items</p>
                </div>
           
              </div>
            </Modal>
            {/* End Form Modal */}

                  {/* Start Form Modal */}
           <Modal
              modalClassName="modal-black"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("formModal")}
                >
                  <i className="tim-icons icon-simple-remove text-white" />
                </button>
                <div className="text-muted text-center ml-auto mr-auto">
                  <h3 className="mb-0"> { this.state.isLoginView ? 'Sign in with' : 'Sign up' }</h3>
                </div>
              </div>
              <div className="modal-body">
                <div className="btn-wrapper text-center">
                
                </div>
                <div className="text-center text-muted mb-4 mt-3">
                  <small>Or sign in with credentials</small>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.emailFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="username"
                        type="username"
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                        onChange={this.inputChanged}
                        name="username" value={this.state.credentials.username}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                        onChange={this.inputChanged}
                        name="password" value={this.state.credentials.password}
                      />
                    </InputGroup>
                  </FormGroup>
                
                  <div className="text-center">
                    <Button onClick={this.login} className="my-4" color="primary" type="button">
                    { this.state.isLoginView ? 'Login' : 'Register'}
                    </Button>
                    <p style={{fontSize:10}} onClick={() => {this.handleOnClick(); this.toggleModal("formModal"); }}>
                { this.state.isLoginView ? 'Dont have an account? Scroll down to sign up' : 'back to login'}
            </p>
                  </div>
                </Form>
              </div>
            </Modal>
            {/* End Form Modal */}
              </Row>
            </Container>
          </section>
        
    
        
          <Footer />
        </div>
      </>
    );
  }
}

export default withCookies(ProductPage);
