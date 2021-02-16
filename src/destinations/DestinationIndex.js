import React, { useState,useEffect } from 'react';
import {Container, Row, Col,Table, Button} from 'reactstrap';
import DestinationTable from './DestinationTable';
import DestinationCreate from './DestinationCreate';


const DestinationIndex=(props)=>{
    console.log("destination props",props);
    const [possibleDestinations,setPossibleDestinations]=useState([]);
    const [selectedDestinations,setSelecteDestinations]=useState([]);

    const deleteDestination=(destination)=>{
        fetch(`http://localhost:3000/destination/${destination.id}`,{
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

    const fetchPossibleDestinations=()=>{
        console.log("trip",props.trip)
        console.log("lon",props.trip.lon)
        console.log("tlat",props.trip.lat)
        fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=${props.trip.lon}&lat=${props.trip.lat}&apikey=${props.api_key}`)
        .then(res=>res.json())
        .then(json=>{
            setPossibleDestinations(json);
            console.log("possible locations",json)
        })

    }
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
              .then((tripData) => {console.log("trip destinations",tripData);setSelecteDestinations(tripData)});
          }; 
    
          useEffect(()=>{fetchSelectedDestinations();fetchPossibleDestinations()},[])

    
    // const tripMapper=()=>{
        
    //     return props.trips.entries.map((trip,index)=>{
    //         return(
    //             <tr key={index}>
    //                 <th scope="row">{trip.id}</th>
    //                 <td>{trip.description}</td>
    //                 <td>{trip.place}</td>
    //                 <td>
    //                     <Button color ="warning" onClick={()=>{props.editUpdateTrip(trip);props.updateOn()}}>Update</Button>
    //                     <Button color ="danger" onClick={()=>deleteDestination(trip)}>Delete</Button>
    //                     <Button color ="blue" onClick={()=>addDestinations(trip)}>Add destinations</Button>
    //                 </td>

    //             </tr>
    //         )
    //     })
    // }

    return (
        <Container>
            <Row>
                <Col md="3">
                    <DestinationCreate token={props.token} fetchSelectedDestinations={fetchSelectedDestinations} api_key={props.api_key}/>
                </Col>
                {/* <Col md="9">
                    <DestinationTable trips={trips} setTripForDestinations={setTripForDestinations} tripForDestinations={tripForDestinations} editUpdateTrip={editUpdateTrip} updateOn={updateOn} token={props.token} fetchTrips={fetchTrips}/>
                </Col>
                {updateActive?<TripEdit tripToUpdate={tripToUpdate} updateOff={updateOff} token={props.token} fetchTrips={fetchTrips}/>:<></>} */}
            </Row>
            Hey
            {/* {tripForDestinations.id==null?<></>:<DestinationIndex api_key={props.api_key} token={props.token} trip={tripForDestinations}/>} */}
        </Container>
        );
    return(
        <>
        <h3>Destination Table</h3>
        <h4>Here are some places to go in {props.trip.place}:</h4>
        </>
    )
}

export default DestinationIndex;