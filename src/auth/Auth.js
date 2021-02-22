import React from 'react';
import {Container,Row,Col} from 'reactstrap';

import Signup from './Signup'
import Login from './Login'
import "./Auth.css"


const Auth = (props)=>{
    return(
        <Container className = "auth-container">
            <Row>
                <Col md="12">
            <h1>Welcome to Travel App!</h1>
            </Col>
                </Row>
                <br/>
                <Row>
                <Col md="6">
                    
                    <Signup updateToken={props.updateToken}/>
                </Col>
                <Col md="6">
                    
                    <Login updateToken={props.updateToken}/>
                </Col>
                
            </Row>
        </Container>
    )
}


export default Auth;