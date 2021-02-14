import React, { useState,useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import {Table, Button} from 'reactstrap';

const DestinationTable=(props)=>{
    console.log("destination props",props);
    
    const [destinations,setDestinations]=useState([]);

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
    const addDestinations=(trip)=>{
        console.log("props from add", props);
        console.log("trip",trip)
    }
    const fetchDestinations=()=>{
            fetch("http://localhost:3000/destination", {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': props.token,
              }),
            })
              .then((res) => res.json())
              .then((tripData) => {console.log(tripData);setDestinations(tripData)});
          }; 
    
          useEffect(()=>fetchDestinations(),[])

    
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

    
    return(
        <>
        <h3>Destination Table</h3>
        <h4>Here are some places to go in {props.trip.place}:</h4>
        </>
    )
}

export default DestinationTable;