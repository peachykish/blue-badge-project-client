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
import Edit from "../assets/edit.png";
import Trash from "../assets/trash.png";

const TripTable = (props) => {
  if (props.trips.error) {
    if (props.trips.error.name == "TokenExpiredError") {
      localStorage.clear();
      console.log("expired");
    }
  }
<<<<<<< HEAD

  const tripUpdate = (latitude, longitude, id) => {
    fetch(`http://localhost:3000/trip/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        trip: {
          description: editDesc,
          place: editPlace,
          lat: latitude,
          lon: longitude,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("updated", json);
        setFlipped(-1);
        props.fetchTrips();
      });
  };
  const deleteTrip = (trip) => {
    setFlipped(-1);
    fetch(`http://localhost:3000/trip/${trip.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => {
      props.fetchTrips();
    });
  };
  const fetchEditTrips = (e, id) => {
    e.preventDefault();
    fetch(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${editPlace}&apikey=${props.api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLat(data.lat);
        setLon(data.lon);
        return [data.lat, data.lon];
      })
      .then((data) => {
        tripUpdate(data[0], data[1], id);
      });
  };
=======
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
>>>>>>> 7ab1052699c00ec7598276678c5a2b6bc2994123

  const tripMapper = () => {
    return props.trips.entries?.map((trip, index) => {
      let url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12270.76212403068!2d${trip.lon}!3d${trip.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1612883072404!5m2!1sen!2sus`;
      return (
<<<<<<< HEAD
        <Flippy
          flipOnClick={false}
          isFlipped={flipped == trip.id}
          
        >
          <FrontSide style={{
            backgroundColor:"#e6e9ed",
            margin:"20px",
            height: "100%",
            width: "300px",
            textAlign: "left",
          }} >
            <Container>
              <Row>
                <Col md="10">
                  <h2>{trip.place}</h2>
                </Col>
                <Col md="2">
                  {flipped == -1 && (
                    <i
                      class="fa fa-pencil"
                      style={{ fontSize: "24px" }}
                      onClick={() => {
                        setEditDesc(trip.description);
                        setEditPlace(trip.place);
                        setFlipped(trip.id);
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <h3>{trip.description}</h3>
              </Row>
              <Row>
                <iframe
                  src={url}
                  style={{ height: "150px", width: "220px", margin: "auto" }}
                  frameBorder="0"
                ></iframe>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col md="10">
                  <Button id="btns"
                    onClick={() => {
                      props.setTripForDestinations(trip);
                      props.setDisplayedNum(6);
                    }}
                  >
                    Things to do
                  </Button>
                </Col>
                <Col md="2">
                  <i
                    class="fa fa-trash-o"
                    style={{ fontSize: "24px" }}
                    onClick={() => deleteTrip(trip)}
                  />
                </Col>
              </Row>
            </Container>
          </FrontSide>
          <BackSide style={{
            padding:"15px",
            height: "100%",
            width: "300px",
            textAlign: "left",
            margin:"20px",
          }} > 
            <Form type="submit" onSubmit={(e) => fetchEditTrips(e, trip.id)}>
              <FormGroup>
                <Label htmlFor="place">Edit the Place:</Label>
                <Input
                  name="place"
                  value={editPlace}
                  onChange={(e) => setEditPlace(e.target.value)}
=======
        <Card className="tripCard"
          key={index}
          style={{
            padding: "15px",
            height: "300px",
            width: "300px",
            textAlign: "left",
          }}
        >
          <Container>
            <Row>
              <Col md="10">
                <CardTitle>{trip.place}</CardTitle>
              </Col>
              <Col md="2">
                <img
                  src={Edit}
                  style={{ height: "20px" }}
                  onClick={() => {
                    props.editUpdateTrip(trip);
                    props.updateOn();
                  }}
>>>>>>> 7ab1052699c00ec7598276678c5a2b6bc2994123
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
            <Row>
              <Col md="10">
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
                <img
                  src={Trash}
                  style={{ margin: "auto", height: "20px" }}
                  onClick={() => deleteTrip(trip)}
                />
              </Col>
            </Row>
          </Container>
        </Card>
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