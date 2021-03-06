import React, { useState } from "react";
import APIURL from '../helpers/environment';
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
    fetch(`${APIURL}/trip/${id}`, {
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
        setFlipped(-1);
        props.fetchTrips();
      });
  };
  const deleteTrip = (trip) => {
    setFlipped(-1);
    fetch(`${APIURL}/trip/${trip.id}`, {
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
  
  }
  const tripMapper = () => {
    let trips=props.trips.entries;
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
            height: "340px",
            width: "300px",
            textAlign: "left",
          }} >
            <Container>
              <Row>
            <Col>
                  <h2 className="float-left">{trip.place}</h2>
               
            
                  {flipped == -1 && (
                    <i 
                      class="fa fa-pencil float-right"
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
              <Row style={{margin:'auto', marginTop: "10px" ,justifyContent:'center'}}>
               
                  <Button style={{marginRight:"50px"}}id="btns"
                    onClick={() => {
                      props.setTripForDestinations(trip);
                      props.setDisplayedNum(6);
                    }}
                  >
                    Things to do
                  </Button>
                
                
                  <i
                    class="fa fa-trash-o"
                    style={{ fontSize: "36px" }}
                    onClick={() => deleteTrip(trip)}
                  />
                
              </Row>
            </Container>
          </FrontSide>
          <BackSide style={{
               height: "340px",
               width: "300px",
               marginLeft:'20px',
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
                <Input id="editInput"
                  name="description"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
              </FormGroup>
              <Button id="btns" type="submit">Update</Button>
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