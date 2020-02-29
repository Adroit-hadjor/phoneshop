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
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
 
} from "reactstrap";



class JavaScript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      formModal: false
    };
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
login = event => {
    if(this.state.isLoginView) {
        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
            }).then( resp => resp.json())
            .then( res => {
                console.log(res.token);
                this.props.cookies.set('mr-token', res.token);
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
  render() {
    return (
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
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="username"
                        type="email"
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
                  <FormGroup check className="mt-3">
                    <Label check>
                      <Input defaultChecked type="checkbox" />
                      <span className="form-check-sign" />
                      Remember me!
                    </Label>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button">
                    { this.state.isLoginView ? 'Login' : 'Register'}
                    </Button>
                    <p onClick={this.toggleView}>
                { this.state.isLoginView ? 'Create Account' : 'back to login'}
            </p>
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

export default JavaScript;
