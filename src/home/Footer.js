import React from "react";
import "./Footer.css"

const Footer = () => {


const Footer = () => {
  var style = {
    backgroundColor: "#303428",
    color: 'white',
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
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