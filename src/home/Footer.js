import { none } from "ol/centerconstraint";
import React from "react";
import "./Footer.css"

const Footer = () => {

  var style = {
    backgroundColor: "#303428",
    color: 'white',
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    border:none
};
    return (

        <div style={style}>
          {/* <Container fluid id="foot"> */}
            &copy; {new Date().getFullYear()} Copyright: Team 5
          {/* </Container> */}
        </div>

    );
  }
export default Footer;