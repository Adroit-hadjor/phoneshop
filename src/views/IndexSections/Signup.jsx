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
import classnames from "classnames";
import { Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import ComponentsNavbar from "components/Navbars/IndexNavbar.jsx";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";

class Signup extends React.Component {
 constructor(props){
   super(props);
  this.state = {
    credentials: {
      username: '',
      password: ''
  },
    username:"",
    password:"",
    fullname:"",
    location:"",
    phoneno:"",
    registered:false,
    token: this.props.cookies.get('mr-token'),
    formModal: false,
    isLoginView: true

  };
 
  this.login = this.login.bind(this)
  this.register = this.register.bind(this)
  this.createUserDetails = this.createUserDetails.bind(this)
  this.myDivToFocus = React.createRef()
}

toggleModal = modalState => {
  this.setState({
    [modalState]: !this.state[modalState]
  });
};

  inputChanged = event => {
    let cred = this.state;
    cred[event.target.name] = event.target.value;
    this.setState({state: cred});
}
inputChangedCred = event => {
  let cred = this.state.credentials;
  cred[event.target.name] = event.target.value;
  this.setState({credentials: cred});
}

handleOnClick = (event) => {
  //.current is verification that your element has rendered
  if(this.myDivToFocus.current){
      this.myDivToFocus.current.scrollIntoView({ 
         behavior: "smooth", 
         block: "nearest",
      })
  }
}



  createUserDetails(){
    fetch(`${process.env.REACT_APP_API_URL}/api/users/0/fill_details/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.token}`},
      body: JSON.stringify({fullname:this.state.fullname,location:this.state.location,phoneno:this.state.phoneno})
      }).then( resp => resp.json())
      .then( res => {
        alert("YOU HAVE BEEN SUCCESSFULLY REGISTERED");
        this.toggleModal("formModal");
         
      })
      .catch( error => console.log(error))
  }

  login = () =>{
    

      fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username:this.state.username,password:this.state.password})
        }).then( resp => resp.json())
        .then( res => {
            this.setState({token:res.token});
            this.props.cookies.set('mr-token', res.token);
            this.createUserDetails();
            
        })
        .catch( error => console.log(error))
    
  }

  signin = () => {

        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => {
                this.toggleModal("formModal");
                this.props.cookies.set('mr-token', res.token);
                window.location.href = "/";
                console.log(this.state.token);
               
               
            })
            .catch( error => console.log(error))
   
}



  register = event => {
   
        fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username:this.state.username,password:this.state.password})
            }).then( resp => resp.json())
            .then( res => {
               if(res.id){
                this.login();
               }
               else{
                  alert("Username already exists");
                }
               
            })
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            })

    
}

  render() {
    return (
      <div className="section section-signup">
        <Container>
          <div className="squares square-1" />
          <div className="squares square-2" />
          <div className="squares square-3" />
          <div className="squares square-4" />
          <Row className="row-grid justify-content-between align-items-center">
            <Col lg="6">
              <h3 className="display-3 text-white">
                SIGN UP {" "}
                <span className="text-white">HERE TODAY</span>
              </h3>
              <p className="text-white mb-3">
                Register here to get the latest feedback on deals.And you can sell your phone back to us and top up to  get the latest phones.
              </p>
              <div className="btn-wrapper">
                <Button color="primary" to="register-page" tag={Link}>
                  Register Page
                </Button>
              </div>
            </Col>
            <Col  lg="6">
              <Card className="card-register">
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("assets/img/square-purple-1.png")}
                  />
                  <CardTitle tag="h4">Register</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form">
                   
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.usernameFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        onFocus={e => this.setState({ usernameFocus: true })}
                        onBlur={e => this.setState({ usernameFocus: false })}
                        onChange = {this.inputChanged}
                        name="username" value={this.state.username}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.passwordFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="text"
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                        name="password" value={this.state.password}
                        onChange = {this.inputChanged}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.fullNameFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        onFocus={e => this.setState({ fullNameFocus: true })}
                        onBlur={e => this.setState({ fullNameFocus: false })}
                        name="fullname" value={this.state.fullname}
                        onChange = {this.inputChanged}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.locationFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="address/location"
                        type="text"
                        onFocus={e => this.setState({ locationFocus: true })}
                        onBlur={e => this.setState({ locationFocus: false })}
                        name="location" value={this.state.location}
                        onChange = {this.inputChanged}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.phoneFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="phone number"
                        type="text"
                        onFocus={e => this.setState({ phoneFocus: true })}
                        onBlur={e => this.setState({ phoneFocus: false })}
                        name="phoneno" value={this.state.phoneno}
                        onChange = {this.inputChanged}
                      />
                    </InputGroup>
                  
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button 
                  onClick={() => {this.register()}}
                  className="btn-round" color="primary" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            
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
                  <h3 className="mb-0"> Sign In</h3>
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
                        onChange={this.inputChangedCred}
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
                        onChange={this.inputChangedCred}
                        name="password" value={this.state.credentials.password}
                      />
                    </InputGroup>
                  </FormGroup>
                
                  <div className="text-center">
                    <Button onClick={this.signin} className="my-4" color="primary" type="button">
                    { this.state.isLoginView ? 'Login' : 'Register'}
                    </Button>
                    <p style={{fontSize:10}} onClick={() => {this.handleOnClick(); this.signin(); }}></p>
                  </div>
                </Form>
              </div>
            </Modal>
            {/* End Form Modal */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default withCookies(Signup);
