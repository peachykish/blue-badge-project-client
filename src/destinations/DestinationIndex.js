import React, { useState,useEffect } from 'react';
import {Container, Row, Col,Table, Button} from 'reactstrap';
import DestinationTable from './DestinationTable';
import DestinationCreate from './DestinationCreate';


const DestinationIndex=(props)=>{

    console.log("destination props",props);
    const [selectedDestinations,setSelecteDestinations]=useState([]);
    const [filteredDest, setFilteredDest] = useState([])
    
    async function fetchSelectedDestinations(){
            let res = await fetch("http://localhost:3000/destination/", {
              method: "GET",
              //body:JSON.stringify({destination:{trip_id:props.trip_id}}),
              headers: new Headers({
               'Content-Type': 'application/json',
                'Authorization': props.token,       
              }),
            })
              res = await res.json()
              let newArr = await tripDestinations(res.entries)
                console.log("newArr",newArr);
                console.log(res);
              let nothing = await setSelecteDestinations(newArr);
              console.log("nothing",nothing);
              console.log("sd",selectedDestinations);
                
          }; 
    async function tripDestinations(arr){
      // if (props.tripForDestinations.id == newArr[0].trip_id) {
        return arr.filter((item)=>item.trip_id==props.tripForDestinations.id)
      // }
    }


    return (
        <Container>
          <Row>
        <Col md="5">
            <DestinationTable
              token={props.token}
              trip={props.tripForDestinations}
              selectedDestinations={selectedDestinations}
              fetchSelectedDestinations={fetchSelectedDestinations}
            />
          
        </Col>
        <Col md="2"/>
        <Col md="5">
          <DestinationCreate filteredDest={filteredDest} setFilteredDest={setFilteredDest} displayedNum={props.displayedNum} setDisplayedNum={props.setDisplayedNum} token={props.token} api_key={props.api_key} trip={props.tripForDestinations} selectedDestinations={selectedDestinations} fetchSelectedDestinations={fetchSelectedDestinations}/>
        </Col>
      </Row>
        </Container>
        );
}

export default DestinationIndex;