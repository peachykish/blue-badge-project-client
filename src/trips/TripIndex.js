import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import TripCreate from "../trips/TripCreate";
import TripTable from "../trips/TripTable";



const TripIndex = (props) => {
    const [trips, setTrips] = useState([]);
    const fetchTrips = () => {
        fetch("http://localhost:3000/trip", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: props.token,
          }),
        })
          .then((res) => res.json())
          .then((tripData) => setTrips(tripData));
      };

  useEffect(() => {
    fetchTrips();
  }, []);


  return (
    <Container  style={{margin:'auto',justifyContent: 'center'}}>
      <Row style={{margin:'auto',justifyContent: 'center'}}>
      
        <TripCreate 
          token={props.token}
          fetchTrips={fetchTrips}
          api_key={props.api_key}
        />
 
        <TripTable
          trips={trips}
          setTripForDestinations={props.setTripForDestinations}
          tripForDestinations={props.tripForDestinations}
          setDisplayedNum={props.setDisplayedNum}
          token={props.token}
          fetchTrips={fetchTrips}
          api_key={props.api_key}
          token={props.token}
        />
      
      </Row>
    </Container>
  );
};
export default TripIndex;
