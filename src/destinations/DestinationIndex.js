import React, { useState,useEffect } from 'react';
import {Container, Row, Col,Table, Button} from 'reactstrap';
import DestinationTable from './DestinationTable';
import DestinationCreate from './DestinationCreate';


const DestinationIndex=(props)=>{
    console.log("destination props",props);
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
                    <DestinationCreate token={props.token} fetchSelectedDestinations={fetchSelectedDestinations} api_key={props.api_key} trip={props.trip}/>
                </Col>
                <Col md="9">
                    <DestinationTable trip={props.trip} token={props.token}/>
                </Col>
                {/* {updateActive?<TripEdit tripToUpdate={tripToUpdate} updateOff={updateOff} token={props.token} fetchTrips={fetchTrips}/>:<></>} */} 
            </Row>
            {/* {tripForDestinations.id==null?<></>:<DestinationIndex api_key={props.api_key} token={props.token} trip={tripForDestinations}/>} */}
        </Container>
        );
}

export default DestinationIndex;