import React,{useState} from 'react';
import {Collapse, Navbar,NavbarBrand,Nav,NavItem,Button, NavbarToggler} from 'reactstrap';
import Airplane from '../auth/appLogo.png';

const Sitebar=(props)=>{
    const [isOpen,setIsOpen]=useState(false);

    return(
        <Navbar color= "faded" light expand="md" >
            <NavbarBrand href="/">TRAVEL APP 
    {props.sessionToken===localStorage.getItem('token')&&<img style={{width:'30px'}} src = {Airplane}/>}</NavbarBrand>
            <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    {props.sessionToken===localStorage.getItem('token')?<Button style={{transform:"skew(10deg)"}} onClick={props.clickLogout}>Logout</Button>:<></>}
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Sitebar;