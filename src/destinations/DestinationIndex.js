import React, { useState,useEffect } from 'react';
import {Container, Row, Col,Table, Button} from 'reactstrap';
import DestinationTable from './DestinationTable';
import DestinationCreate from './DestinationCreate';


const DestinationIndex=(props)=>{
    console.log("destination props",props);
    const [selectedDestinations,setSelecteDestinations]=useState([]);
    
    const fetchSelectedDestinations=()=>{
            fetch("http://localhost:3000/destination", {
              method: "GET",
             // body:JSON.stringify({destination:{trip_id:props.trip.id}}),
              headers: new Headers({
               'Content-Type': 'application/json',
                'Authorization': props.token,       
              }),
            })
              .then((res) => res.json())
              .then((tripData) => {
                console.log("trip destinations",tripData);
                setSelecteDestinations(tripData)});
          }; 
    

    return (
        <Container>
          <Row>
        <Col md="6">
            <DestinationTable
              token={props.token}
              trip={props.tripForDestinations}
              fetchSelectedDestinations={fetchSelectedDestinations}
            />
          
        </Col>
        <Col md="6">
          <DestinationCreate api_key={props.api_key} trip={props.tripForDestinations} fetchSelectedDestinations={fetchSelectedDestinations}/>
        </Col>
      </Row>
        </Container>
        );
}

export default DestinationIndex;