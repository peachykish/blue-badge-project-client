import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DestinationIndex from "../destinations/DestinationIndex";
import TripIndex from '../trips/TripIndex'

const Home = (props) => {
  console.log(props);
  const [tripForDestinations, setTripForDestinations] = useState();

 return (
    <Container>
      <TripIndex token={props.token} api_key={props.api_key} tripForDestinations={tripForDestinations} setTripForDestinations={setTripForDestinations}/>
      {tripForDestinations?<DestinationIndex token={props.token} api_key={props.api_key} tripForDestinations={tripForDestinations} setTripForDestinations={setTripForDestinations}/>:null}
    </Container>
  );
};

export default Home;
