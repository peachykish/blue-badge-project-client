import React,{useState} from 'react';
import {Collapse, Navbar,NavbarBrand,Nav,NavItem,Button, NavbarToggler} from 'reactstrap';

const Sitebar=(props)=>{
    const [isOpen,setIsOpen]=useState(false);

    // const toggle=()=>{
    //     setIsOpen(!isOpen);
    // }

    return(
        <Navbar color = "faded" light expand="md">
            <NavbarBrand href="/">TRAVEL APP</NavbarBrand>
            {/* <NavbarToggler onClick={toggle}/> */}
            <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
            <Collapse isOpen={isOpen} navbar>
            {/* <Nav style={{backgroundColor: '#f1f1f1'}}>Something</Nav> */}
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={props.clickLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Sitebar;