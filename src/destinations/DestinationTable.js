import {useEffect} from 'react'
import {
    Button,
    Card,
    Row,
    CardImg,
    CardTitle,
    Container,
  } from "reactstrap";

import "./Destinations.css"

const DestinationTable=(props)=>{
    console.log("dt props",props)
    useEffect(()=>props.fetchSelectedDestinations(),[props.trip])

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
            props.fetchSelectedDestinations()
        })
    }

     const selectedDestinationsMapper=()=>{
        
         return props.selectedDestinations.map((destination)=>{
            return(
                <Card key={destination.wikidata} style={{ width: "250px", margin: "5px" }}>
                <Container>
                  <CardTitle>{destination.name}</CardTitle>
                  <CardImg src={destination.image} style={{ height: "150px" }} />
                  <Button id="addIt" style={{ margin: "10px" }} onClick={()=>{
                                   props.setPossibleDestinations([...props.possibleDestinations,destination])
                                   deleteDestination(destination);}}>Remove</Button>
                                   
          
                </Container>
              </Card>
             
             )
         })
     }

    
     return(
         <>
         <Row><h3>Your list:</h3></Row>
        <Row>
            {props.selectedDestinations.length==0?useEffect:selectedDestinationsMapper()}
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        
        </>
     )
}

export default DestinationTable;