import React, { useState, useEffect } from "react";
import {Container, Row, Col} from 'reactstrap'
import TripCreate from './TripCreate'
import TripTable from "./TripTable";
import TripEdit from "./TripEdit";
import DestinationIndex from '../destinations/DestinationIndex'

const TripIndex = (props) => {
  const [trips, setTrips] = useState([]);
  const [updateActive,setUpdateActive]=useState(false);
  const [tripToUpdate,setTripToUpdate]=useState({});
  const [tripForDestinations,setTripForDestinations]=useState({});


  const fetchTrips = () => {
    fetch("http://localhost:3000/trip", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': props.token,
      }),
    })
      .then((res) => res.json())
      .then((tripData) => setTrips(tripData));
  };

  const editUpdateTrip=(trip)=>{
    setTripToUpdate(trip);
    console.log(trip)
  }

  const updateOn=()=>{
      setUpdateActive(true);
  }

  const updateOff=()=>{
      setUpdateActive(false);
  }

  useEffect(()=>{
      fetchTrips();
  },[])
 
  return (
    <Container>
        <Row>
            <Col md="3">
                <TripCreate token={props.token} fetchTrips={fetchTrips} api_key={props.api_key}/>
            </Col>
            <Col md="9">
                <TripTable trips={trips} setTripForDestinations={setTripForDestinations} tripForDestinations={tripForDestinations} editUpdateTrip={editUpdateTrip} updateOn={updateOn} token={props.token} fetchTrips={fetchTrips}/>
            </Col>
            {updateActive?<TripEdit tripToUpdate={tripToUpdate} updateOff={updateOff} token={props.token} fetchTrips={fetchTrips}/>:<></>}
        </Row>
        {tripForDestinations.id==null?<></>:<DestinationIndex api_key={props.api_key} token={props.token} trip={tripForDestinations}/>}
    </Container>
    );
};

export default TripIndex;
