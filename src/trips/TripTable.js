import React, { useEffect } from 'react';
import {Table, Button} from 'reactstrap';

const TripTable=(props)=>{
    console.log("triptable props",props);
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
    const addDestinations=(trip)=>{
        console.log("props from add", props);
        console.log("trip",trip)
        props.setTripForDestinations(trip)
        console.log(props.tripForDestinations);
    }

    
    const tripMapper=()=>{
        
        return props.trips.entries.map((trip,index)=>{
            return(
                <tr key={index}>
                    <th scope="row">{trip.id}</th>
                    <td>{trip.description}</td>
                    <td>{trip.place}</td>
                    <td>
                        <Button color ="warning" onClick={()=>{props.editUpdateTrip(trip);props.updateOn()}}>Update</Button>
                        <Button color ="danger" onClick={()=>deleteTrip(trip)}>Delete</Button>
                        <Button color ="normal" onClick={()=>addDestinations(trip)}>Add destinations</Button>
                    </td>

                </tr>
            )
        })
    }

    
    return(
        <>
        <h3>Trip Table</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Place</th>

                </tr>
            </thead>
            <tbody>
                {props.trips.entries.length==0?useEffect:tripMapper()}
                {/* I had to tweak this ^^^ to get it to work! */}
            </tbody>
        </Table>
        </>
    )
}

export default TripTable;