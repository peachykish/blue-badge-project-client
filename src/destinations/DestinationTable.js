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
                <Card key={destination.wikidata} style={{ width: "250px", margin: "5px" ,boxShadow: '0 4px 8px 0 rgba(0,0,0,.2)' }}>
                <Container>
                  <CardTitle>{destination.name}</CardTitle>
                  <CardImg src={destination.image} style={{ height: "150px" }} />
                  <Row style={{margin:'auto',justifyContent:'center'}}>
                  <Button id="addIt" style={{ margin: "10px" }} onClick={()=>{
                                   props.setPossibleDestinations([...props.possibleDestinations,destination])
                                   deleteDestination(destination);}}>Remove</Button>
                                   
          </Row>
                </Container>
              </Card>
             
             )
         })
     }

    
     return(
         <Container fluid >
         <Row style={{margin:'auto',justifyContent: 'center'}}><h3>Your list:</h3></Row>
        <Row style={{margin:'auto',justifyContent: 'center'}}>
            {props.selectedDestinations.length==0?useEffect:selectedDestinationsMapper()}
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        
        </Container>
     )
}

export default DestinationTable;