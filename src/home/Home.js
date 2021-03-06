import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DestinationIndex from "../destinations/DestinationIndex";
import TripIndex from '../trips/TripIndex'
const Home = (props) => {
  const [tripForDestinations, setTripForDestinations] = useState();
  const [displayedNum,setDisplayedNum] = useState(6);



 return (
    <Container fluid style={{margin:'auto',justifyContent: 'center'}} >
      <Row style={{margin:'auto',justifyContent: 'center'}}>
      <TripIndex setDisplayedNum={setDisplayedNum} token={props.token} api_key={props.api_key} tripForDestinations={tripForDestinations} setTripForDestinations={setTripForDestinations}/>
      <div style={{height:"40px"}}></div>
      {tripForDestinations?<DestinationIndex displayedNum={displayedNum} setDisplayedNum={setDisplayedNum} token={props.token} api_key={props.api_key} tripForDestinations={tripForDestinations} setTripForDestinations={setTripForDestinations}/>:null}
      </Row>
    </Container>
  );
};

export default Home;