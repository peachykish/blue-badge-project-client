import React, { useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap";
import "./Trips.css";

const TripTable = (props) => {
  const [flipped, setFlipped] = useState(-1);
  const [editDesc, setEditDesc] = useState("");
  const [editPlace, setEditPlace] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  if (props.trips.error) {
    if (props.trips.error.name == "TokenExpiredError") {
      localStorage.clear();
    }
  }

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
  function insertionSort(files,attrToSortBy){
    for(var k=1; k < files.length; k++){
       for(var i=k; i > 0 && new Date(files[i][attrToSortBy]) > 
         new Date(files[i-1][attrToSortBy]); i--){
  
          var tmpFile = files[i];
          files[i] = files[i-1];
          files[i-1] = tmpFile;
  
       }
    }
    console.log("sorted!")
  
  }
  const tripMapper = () => {
    let trips=props.trips.entries;
    console.log(trips);
    insertionSort(trips,"updatedAt");
    return props.trips.entries?.map((trip) => {
      let url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12270.76212403068!2d${trip.lon}!3d${trip.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1612883072404!5m2!1sen!2sus`;
      return (
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
        <Card className="tripCard"
          key={index}
          style={{
            backgroundColor:"grey",
            padding: "15px",
            margin:"15px",
            height: "100",
            width: "300px",
            textAlign: "left",

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
            
            height: "300px",
            width: "300px",
            textAlign: "left",
          }} > 
            <Form type="submit" onSubmit={(e) => fetchEditTrips(e, trip.id)}>
              <FormGroup>
                <Label htmlFor="place">Edit the Place:</Label>
                <Input
                  name="place"
                  value={editPlace}
                  onChange={(e) => setEditPlace(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Edit the Reason:</Label>
                <Input
                  name="description"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
              </FormGroup>
              <Button type="submit">Update</Button>
            </Form>
          </BackSide>
        </Flippy>
      );
    });
  };

  return (
    <> 
      {props.trips.entries && props.trips.entries.length > 0 && tripMapper()}
    </>
  );
};

export default TripTable;