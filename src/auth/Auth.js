import {useState} from 'react';
import {Container,Row,Col, Button} from 'reactstrap';

import Signup from './Signup'
import Login from './Login'
import "./Auth.css"


const Auth = (props)=>{
    const [toggle, setToggle] = useState(false);
    return(
        <Container fluid>
            <Row>
            <Col id="sideBoxTop" md="2">
            </Col>
                <Col md="10">
            <h1 id="welcome">Welcome to Travel App!</h1>
            </Col>
                </Row>
                <br/>
                <Row>
                <Col id="sideBox" md="2">
                    
                </Col>
                <Col md="4"></Col>
                <Col md="4">
                    <Button onClick={() => setToggle(!toggle)}>First Time Traveler? <br/>  CLICK HERE</Button> 
                    <br/>
                    {toggle ? <Signup updateToken={props.updateToken}/> : <Login updateToken={props.updateToken}/>}

                </Col>
                <Col md="4">
                    
                   
                </Col>
                
            </Row>
            
        </Container>
        
    )
}


export default Auth;