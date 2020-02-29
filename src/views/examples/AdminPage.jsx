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

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      name:"",
      type:"",
      description:"",
      img:[],
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


  render() {
  
    

    return (

      
      <Container>
      <Row>
        <br></br>
      </Row>
        <Row >
          <Col className="mb-lg-auto" lg="11">
<div style={{margin:100}} className="wrapper">
          
          <Card>
              <CardHeader>Add items here</CardHeader>
              <CardBody>
              <Form className="form">
                
               
                   <InputGroup
                     className={classnames({
                       "input-group-focus": this.state.nameFocus
                     })}
                   >
                     <InputGroupAddon addonType="prepend">
                       <InputGroupText>
                        
                       </InputGroupText>
                     </InputGroupAddon>
                     <Input
                       placeholder="Name"
                       type="text"
                       onFocus={e => this.setState({ nameFocus: true })}
                       onBlur={e => this.setState({ nameFocus: false })}
                       name="name" value={this.state.name}
                       onChange = {this.inputChanged}
                     />
                   </InputGroup>
                   <InputGroup
                     className={classnames({
                       "input-group-focus": this.state.priceFocus
                     })}
                   >
                     <InputGroupAddon addonType="prepend">
                       <InputGroupText>
                        
                       </InputGroupText>
                     </InputGroupAddon>
                     <Input
                       placeholder="price"
                       type="text"
                       onFocus={e => this.setState({ priceFocus: true })}
                       onBlur={e => this.setState({ priceFocus: false })}
                       name="price" value={this.state.price}
                       onChange = {this.inputChanged}
                     />
                   </InputGroup>
                   <InputGroup
                     className={classnames({
                       "input-group-focus": this.state.typeFocus
                     })}
                   >
                     <InputGroupAddon addonType="prepend">
                       <InputGroupText>
                        
                       </InputGroupText>
                     </InputGroupAddon>
                     <Input
                       placeholder="type"
                       type="select"
                       onFocus={e => this.setState({ typeFocus: true })}
                       onBlur={e => this.setState({ typeFocus: false })}
                       name="location" value={this.state.type}
                       onChange = {this.inputChanged}
                     >
                      <option style={{color:"black"}}>iphone</option>
                      <option style={{color:"black"}}>android</option>
                      <option style={{color:"black"}}>accessories</option>
                     </Input>
                   </InputGroup>
                   <InputGroup  className={classnames({
                       "input-group-focus": this.state.descriptionFocus
                     })}>
                              
                                   
                              <Input value={this.state.description} type="textarea" name="text" id="exampleText" placeholder="Enter product description" />
                       
                           </InputGroup >
                   <InputGroup
                     className={classnames({
                       "input-group-focus": this.state.imgFocus
                     })}
                   >
                    
                     Add image
                     <Input
                       placeholder="phone number"
                       type="file"
                       onFocus={e => this.setState({ imgFocus: true })}
                       onBlur={e => this.setState({ imgFocus: false })}
                       name="phoneno" value={this.state.img}
                       onChange = {this.inputChanged}
                     />
                   </InputGroup>
                  
                 </Form>
              </CardBody>
          </Card>
         
      
          </div>
        </Col>
        </Row>
        </Container>
    );
  }
}

export default withCookies(AdminPage);