import React, { useState,useEffect } from 'react';
import "./Trips.css"
import editIcon from '../assets/edit.png';
import {
  Col,
  Table,
  Button,
  Card,
  Container,
  Row,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import Flippy,{FrontSide,BackSide} from 'react-flippy';
import Edit from "../assets/edit.png";
import Trash from "../assets/trash.png";

const TripTable = (props) => {
  const [flipped,setFlipped]=useState(false)

  if (props.trips.error) {
    if (props.trips.error.name == "TokenExpiredError") {
      localStorage.clear();
      console.log("expired");
    }
  }
    const deleteTrip=(trip)=>{
        fetch(`http://localhost:3000/trip/${trip.id}`,{
            method:'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(()=>{
            console.log("delete");
            props.fetchTrips()
        })
    }

  const tripMapper = () => {
    return props.trips.entries?.map((trip, index) => {
      let url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12270.76212403068!2d${trip.lon}!3d${trip.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1612883072404!5m2!1sen!2sus`;
      return (
        <Flippy flipOnClick={false} isFlipped={flipped} style={{
          padding: "15px",
          height: "300px",
          width: "300px",
          textAlign: "left",
        }}>
          <FrontSide style={{
          padding: "15px",
          height: "300px",
          width: "300px",
          textAlign: "left",
        }} onClick={()=>{setFlipped(true)}}>
          <Container>
            <Row>
              <Col md="10">
                <CardTitle>{trip.place}</CardTitle>
              </Col>
              <Col md="2">
              <i class="fa fa-pencil"
                  style={{ fontSize: "24px" }}
                  onClick={() => {
                    props.editUpdateTrip(trip);
                    props.updateOn();
                  }}
                />
              </Col>
            </Row>
            <Row>
              <CardSubtitle>{trip.description}</CardSubtitle>
            </Row>
            <Row>
              <iframe
                src={url}
                style={{ height: "150px", width: "220px", margin: "auto" }}
                frameBorder="0"
              ></iframe>
            </Row>
            <Row style={{marginTop:"20px"}}>
              <Col md="10" >
                <Button
                  color="primary"
                  onClick={() => {
                    props.setTripForDestinations(trip);
                    props.setDisplayedNum(6);
                  }}
                >
                  Things to do
                </Button>
              </Col>
              <Col md="2">
              <i class="fa fa-trash-o"                   style={{ fontSize: "24px" }}
 onClick={() => deleteTrip(trip)}
                />
              </Col>
            </Row>
          </Container>
          </FrontSide>
        </Flippy>
      );
    });
  };

  return (
    <div className="tripCards">
      {props.trips.entries && props.trips.entries.length == 0
        ? useEffect
        : tripMapper()}
    </div>
  );
};

export default TripTable;
