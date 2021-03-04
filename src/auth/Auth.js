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
                <Row>
                <Col id="sideBox" md="2">
                    
                </Col>
                <Col md="4"></Col>
                <Col md="4">
                   
                    {toggle ? <Signup updateToken={props.updateToken}/> : <Login updateToken={props.updateToken}/>}

                    {toggle ? <p class="loginToggle">FIRST TIME TRAVELER?</p> : <p class="loginToggle">DON'T HAVE A LOGIN?  CLICK BELOW</p>}
                <Button id="clickHere" onClick={() => setToggle(!toggle)}>CLICK HERE</Button> 
                    <br/>

                </Col>
                <Col md="4">
                    
                <br/>
                <br/>
                <br/>
                   
                </Col>
                
            </Row>
            
        </Container>
        
    )
}


export default Auth;