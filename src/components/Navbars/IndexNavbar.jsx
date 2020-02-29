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
import { Link } from "react-router-dom";
import classnames from "classnames";
// reactstrap components
import {
  FormGroup,
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Modal,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col
} from "reactstrap";
import { withCookies } from 'react-cookie';

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token : this.props.cookies.get('mr-token'),
      collapseOpen: false,
      color: "navbar-transparent",
      formModal: false,
      credentials: {
        username: '',
        password: ''
    },
    users:[],
    firstName:"",
    isLoginView: true,
    };
    this.myDivToFocus = React.createRef()
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
signOut= (event) => {
  
 this.props.cookies.set('mr-token','');
  window.location.href = "/components";
  console.log(this.state.token);
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

viewProfile(){
  window.location.href = "/profile-page";
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
                this.getUsername();
                window.location.href = "/components";
               
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
toggleView = () => {
    this.setState({isLoginView: !this.state.isLoginView});
}
getUsername(){
  fetch(`${process.env.REACT_APP_API_URL}/api/users/0/get_userdetails/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${this.state.token}`
    }
  }).then( resp => resp.json())
  .then(res =>  {this.setState({users:res.result},console.log(res))})
  .then(console.log(this.state.users))
  .catch( error => console.log(error))
}

  componentDidMount() {
    console.log(this.state.token);
    window.addEventListener("scroll", this.changeColor);
    if(this.state.token){
      this.getUsername()    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
   
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
       
        <div className="" id="javascriptComponents">
       
       <Container>
        
         <Row id="modals">
           
       
          
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
                {/*  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <img alt="..." src={require("assets/img/github.svg")} />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <img alt="..." src={require("assets/img/google.svg")} />
                </Button> */}
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
       </div>
    

          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="SIKASTREET"
              tag={Link}
            >
              <p><span>>>>SIKAstreet• </span>
              WE HAVE THE BEST PHONE AND TECH DEALS</p>
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    DRIP•
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
           
              {this.state.token ? 
                 this.state.users.map( user => {
                   var str = user.fullname;
                   var firstWord = str.replace(/ .*/,'');

                  return(
                    
                    <React.Fragment>  <NavItem  className="nav nav-link d-none d-lg-block "><NavLink>Hi {firstWord}</NavLink></NavItem>
                    <NavItem  className="nav nav-link d-none d-lg-block " >
                    <NavLink   data-placement="bottom"
               
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow us on Twitter">
                    <Link to="/profile-page">My Profile</Link>  

                    </NavLink>
                    </NavItem>
                   <Button
                    className="nav nav-link d-none d-lg-block "
                    color="primary"
                    onClick={this.signOut}
                  >
                    SIGN OUT
                  </Button>
            
                 </React.Fragment>
 
   
                 )                  
                  })
             : 
               
                <Button
                    className="nav nav-link d-none d-lg-block "
                    color="primary"
                    onClick={() => this.toggleModal("formModal")}
                  >
                   LOG IN
                  </Button>
         
             }
               
              
        
         
            <NavItem className="">
                <NavLink
                  data-placement="bottom"
                  onClick={() => this.toggleModal("formModal")}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow us on Twitter"
                >
                
                  <p className="d-lg-none d-xl-none">Login</p>
                </NavLink>
              </NavItem>      

              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://twitter.com/CreativeTim"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow us on Twitter"
                >
                  <i className="fab fa-twitter" />
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://www.facebook.com/CreativeTim"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Like us on Facebook"
                >
                  <i className="fab fa-facebook-square" />
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
              </NavItem>
             
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://www.instagram.com/CreativeTimOfficial"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow us on Instagram"
                >
                  <i className="fab fa-instagram" />
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
              </NavItem>
             


             
             
             
            </Nav>
            
          </Collapse>
        </Container>
      </Navbar>
     
    
    );
  }
}

export default withCookies(ComponentsNavbar);
