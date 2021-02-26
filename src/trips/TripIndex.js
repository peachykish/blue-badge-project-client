import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import TripCreate from "../trips/TripCreate";
import TripTable from "../trips/TripTable";
import TripEdit from "../trips/TripEdit";



const TripIndex = (props) => {
    const [updateActive, setUpdateActive] = useState(false);
    const [tripToUpdate, setTripToUpdate] = useState({});
    const [trips, setTrips] = useState([]);
    const editUpdateTrip = (trip) => {
        setTripToUpdate(trip);
      };
    
      const updateOn = () => {
        setUpdateActive(true);
      };
    
      const updateOff = () => {
        setUpdateActive(false);
      };
    
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
    <div>
    <Row>
      <Col md="3">
        <TripCreate
          token={props.token}
          fetchTrips={fetchTrips}
          api_key={props.api_key}
        />
      </Col>
      <Col md="9">
        <TripTable
          trips={trips}
          setTripForDestinations={props.setTripForDestinations}
          tripForDestinations={props.tripForDestinations}
          setDisplayedNum={props.setDisplayedNum}
          editUpdateTrip={editUpdateTrip}
          updateOn={updateOn}
          token={props.token}
          fetchTrips={fetchTrips}
          api_key={props.api_key}
        />
      </Col>
      {updateActive ? (
        <TripEdit
          tripToUpdate={tripToUpdate}
          updateOff={updateOff}
          token={props.token}
          fetchTrips={fetchTrips}
        />
      ) : (
        <></>
      )}
    </Row>
    </div>
  );
};
export default TripIndex;
