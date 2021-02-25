import React from 'react';
import {Container,Row,Col} from 'reactstrap';

import Signup from './Signup'
import Login from './Login'
import "./Auth.css"


const Auth = (props)=>{
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
                <Col md="4">
                
                    <Signup updateToken={props.updateToken}/>
                </Col>
                <Col md="2">
                    
                    <Login updateToken={props.updateToken}/>
                </Col>
                <Col md="4">
                    
                   
                </Col>
                
            </Row>
            
        </Container>
        
    )
}


export default Auth;