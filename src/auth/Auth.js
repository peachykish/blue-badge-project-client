import React from 'react';
import {Container,Row,Col} from 'reactstrap';

import Signup from './Signup'
import Login from './Login'
import "./Auth.css"


const Auth = (props)=>{
    return(
        <Container className = "auth-container">
            <Row>
            <Col id="sideBoxTop" md="2">
            </Col>
                <Col md="10">
            <h1>Welcome to Travel App!</h1>
            </Col>
                </Row>
                <br/>
                <Row>
                <Col id="sideBox" md="2">
                    
                    Side bar
                </Col>
                <Col md="5">
                    
                    <Signup updateToken={props.updateToken}/>
                </Col>
                <Col md="5">
                    
                    <Login updateToken={props.updateToken}/>
                </Col>
                
            </Row>
        </Container>
    )
}


export default Auth;