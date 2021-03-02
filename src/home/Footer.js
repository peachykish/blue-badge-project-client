import React from "react";
import {Row} from "reactstrap";
import "./Footer.css"
import {Container} from 'reactstrap';

const Footer = () => {
    return (
        
        <div className="footer py-3">
          <Container fluid id="foot">
            &copy; {new Date().getFullYear()} Copyright: Team 5
          </Container>
        </div>
    );
  }


export default Footer;