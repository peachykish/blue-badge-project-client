import {useState} from 'react';
import {Container,Row,Col, Button} from 'reactstrap';

import Signup from './Signup'
import Login from './Login'
import "./Auth.css"


const Auth = (props)=>{
    const [toggle, setToggle] = useState(false);
    return(
        <Container  fluid>
            <Row>
                <Col id="sideBoxTop" md="2"></Col>
                <Col md="10">
                    <h1 id="welcome">Welcome to Travel App!</h1>
                </Col>
                </Row>
            <Row >
         
                   
                    {toggle ? <Signup updateToken={props.updateToken}/> : <Login updateToken={props.updateToken}/>}
                </Row>
            <Row  style={{margin:'auto'}}>
                    {toggle ? <p class="loginToggle">RETURNING TRAVELER?</p> : <p class="loginToggle">FIRST TIME TRAVELER?</p>}
                    </Row>
            <Row >   
                <Button id="clickHere" onClick={() => setToggle(!toggle)}>CLICK HERE</Button> 
                <br/>    
                <br/>
                <br/>
                <br/>
                   
                
            </Row>
            
        </Container>
        
    )
}


export default Auth;