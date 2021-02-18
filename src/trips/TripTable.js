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
        const limit =7;
        console.log("props from add", props);
        console.log("trip",trip)
        props.setTripForDestinations(trip)
        console.log(props.tripForDestinations);
        fetch(
            `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=${trip.lon}&lat=${trip.lat}&apikey=${props.api_key}`
          )
            .then((res) => res.json())
            .then((json) => {
              let filtered = json.features;
              let haveWikidata = [];
              for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].properties.wikidata) {
                  haveWikidata.push(filtered[i]);
                }
              }
              return haveWikidata;
            })
            .then((usable) => {
              //  let count=0;
              const newArray = [];
              //for(let i=0;i<usable.length&&count<limit;i++){
              for (let i = 0; i < usable.length && i < limit; i++) {
                fetch(
                  `https://api.opentripmap.com/0.1/en/places/xid/${usable[i].properties.xid}?apikey=${props.api_key}`
                )
                  .then((res) => res.json())
                  .then((json) => {
                    let img = "";
                    let text = "";
                    if (json.preview) {
                        if(json.preview.source) {
                          img = json.preview.source;
                        }
                    }
                    if (json.wikipedia_extracts) {
                        if(json.wikipedia_extracts.text){
                          text = json.wikipedia_extracts.text;
                        }
                    }
                    //console.log({'preview':json.preview,"preview.source":json.preview.source,"wiki extracts":json.wikipedia_extracts,"wiki extracts.text":json.wikipedia_extracts.text})
                    //if(img!==""&&text!==""){count++};
                    newArray.push({ name: json.name, image: img, descr: text });
                    props.setPossibleDestinations(newArray);
                  });
              }
            }
            )
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
                        <Button color ="normal" onClick={()=>addDestinations(trip)}>Manage destinations</Button>
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