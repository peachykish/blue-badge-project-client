import React, { useState,useEffect } from 'react';
import {Container, Row, Col,Table, Button} from 'reactstrap';
import DestinationTable from './DestinationTable';
import DestinationCreate from './DestinationCreate';



const DestinationIndex=(props)=>{

    console.log("destination props",props);
    const [selectedDestinations,setSelecteDestinations]=useState([]);
    const [filteredDest, setFilteredDest] = useState([])
    
    
    const compare=()=>{
      let reFiltered=[]
      for (let i=0;i<filteredDest.length;i++){
        let match=false;
        for(let j=0;j<selectedDestinations.length;j++){
          if(filteredDest[i].properties.wikidata==selectedDestinations[j].wikidata){
            match=true;
          }
        }
          if (!match){
            reFiltered.push(filteredDest[i])
          }
        
      }
      setFilteredDest(reFiltered);
      console.log(reFiltered);
      console.log(filteredDest)
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
        <Col md="5">
            <DestinationTable
              token={props.token}
              trip={props.tripForDestinations}
              selectedDestinations={selectedDestinations}
              fetchSelectedDestinations={fetchSelectedDestinations}
              compare={compare}
            />
          
        </Col>
        <Col md="2"/>
        <Col md="5">
          <DestinationCreate compare={compare} filteredDest={filteredDest} setFilteredDest={setFilteredDest} displayedNum={props.displayedNum} setDisplayedNum={props.setDisplayedNum} token={props.token} api_key={props.api_key} trip={props.tripForDestinations} selectedDestinations={selectedDestinations} fetchSelectedDestinations={fetchSelectedDestinations}/>
        </Col>
      </Row>
        </Container>

        );
}

export default DestinationIndex;