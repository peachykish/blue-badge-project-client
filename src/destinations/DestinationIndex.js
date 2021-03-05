import React, { useState,useEffect } from 'react';
import {Container, Row, Col,Table, Button} from 'reactstrap';
import DestinationTable from './DestinationTable';
import DestinationCreate from './DestinationCreate';



const DestinationIndex=(props)=>{

    console.log("destination props",props);
    const [selectedDestinations,setSelecteDestinations]=useState([]);
    const [possibleDestinations, setPossibleDestinations] = useState([]) 
    const [filteredDest, setFilteredDest] = useState([])
    
    
    const compare=(wiki)=>{
      let reFiltered=[...possibleDestinations];
      reFiltered=reFiltered.filter((item)=>item.wikidata!=wiki);
      setPossibleDestinations(reFiltered);
    }

    async function fetchSelectedDestinations(){
            let res = await fetch("http://localhost:3000/destination/", {
              method: "GET",
              headers: new Headers({
               'Content-Type': 'application/json',
                'Authorization': props.token,       
              }),
            })
              res = await res.json()
              let newArr = await tripDestinations(res.entries)
              await setSelecteDestinations(newArr);
                
          }; 
    async function tripDestinations(arr){
      // if (props.tripForDestinations.id == newArr[0].trip_id) {
        return arr.filter((item)=>item.trip_id==props.tripForDestinations.id)
      // }
    }


    return (
        <Container>
          <Row>
        <Col md="6">
            
            <DestinationTable
              token={props.token}
              trip={props.tripForDestinations}
              selectedDestinations={selectedDestinations}
              fetchSelectedDestinations={fetchSelectedDestinations}
              possibleDestinations={possibleDestinations} 
              setPossibleDestinations={setPossibleDestinations}
              compare={compare}
            />
          
        </Col>
      
        <Col md="6">
          <Row><DestinationCreate compare={compare} filteredDest={filteredDest} setFilteredDest={setFilteredDest} displayedNum={props.displayedNum} setDisplayedNum={props.setDisplayedNum} token={props.token} api_key={props.api_key} trip={props.tripForDestinations} selectedDestinations={selectedDestinations} fetchSelectedDestinations={fetchSelectedDestinations} possibleDestinations={possibleDestinations} setPossibleDestinations={setPossibleDestinations}/>
          </Row>
        </Col>
      </Row>
        </Container>

        );
}

export default DestinationIndex;