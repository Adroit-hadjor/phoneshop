import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { withCookies } from 'react-cookie';

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";



let ps = null;

class AdminLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      username:"",
      password:"",
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
  

    
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
    // ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");

  
  
  }
  signin = () =>{
    window.location.href = '/admin-page';
   }
 
  render() {
  

    return (
      
     
                 <Container>
                   <Row>
                     <br></br>
                   </Row>
                     <Row >
                       <Col className="mb-lg-auto" lg="11">
        <div style={{margin:100}} className="wrapper">
        
            
          <Card style={{padding:30}} >
              <CardHeader>Sign In As Admin</CardHeader>
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
          
               
                  
                 </Form>
              </CardBody>
              <CardFooter>
                  <Button 
                  onClick={() => {this.signin()}}
                  className="btn-round" color="primary" size="lg">
                    Sign In
                  </Button>
                </CardFooter>
          </Card>
        
         
        </div>
        </Col>
        </Row>
        </Container>
      
     
    );
  }
}

export default withCookies(AdminLoginPage);