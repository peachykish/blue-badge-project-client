import React,{useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input,Container,Row} from 'reactstrap'
import Flippy,{FrontSide,BackSide} from 'react-flippy';

import "./Trips.css"

const TripCreate=(props)=>{
    const [description,setDescription]=useState('');
    const [place,setPlace]=useState('');
    const [lat,setLat]=useState(0.00000);
    const [lon,setLon]=useState(0.00000);
    const [flipped,setFlipped]=useState(false)

       const handleSubmit = (e) => {
        e.preventDefault();
        setFlipped(false);
        console.log("backclick");
        fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${place}&apikey=${props.api_key}`)
        .then(response=>response.json())
        .then(data=>{
            setLat(data.lat);
            setLon(data.lon);
            return [data.lat,data.lon]
        })
        .then((data)=>newTrip(data[0], data[1]));
       };

       const newTrip=(latitude, longitude)=>{
        fetch("http://localhost:3000/trip", {
            method: "POST",
            body:JSON.stringify({trip:{description:description,place:place,lat:latitude,lon:longitude}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token,
            })
        })
            .then((res) => res.json())
            .then((tripData) => {
                console.log('tripData',tripData);
                setDescription('');
                setPlace('');
                props.fetchTrips();
            });
        }
    return(
      
        <Flippy flipOnClick={false} isFlipped={flipped} style={{
        margin:"20px",
        
        height: "340px",
        width: "300px",
        textAlign: "left",      
          }}>
            <FrontSide style={{
        backgroundColor:"#e6e9ed",
            
          }} onClick={()=>{setFlipped(true)}}>
              {/* <span style={{,color:"beige"}}>+</span> */}
              <i className="fa fa-plus-square-o" aria-hidden="true" style={{fontSize:"230px",position:"absolute",top:"18.5%",left:'20%', color:"#252532"}}></i>
          </FrontSide>
            <BackSide style={{
        backgroundColor:"#e6e9ed",
            
          }}>
            <Container>
            <Form type='submit' onSubmit={handleSubmit}>
            <FormGroup style={{paddingTop:'40px'}}>
                    <Label  htmlFor="place"/>Where to?
                    <Input id="whereTo" placeholder="e.g. Seattle" name="place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label  htmlFor="description"/>
                    What's the reason?
                    <Input id="whereTo" placeholder ="e.g. Spring Break!" name="description" value={description} 
                    onChange={(e)=>setDescription(e.target.value)}/>
                </FormGroup>
<Row style={{margin:'auto',justifyContent:'center'}}>
                <Button style={{marginRight:'30px'}} id="btns" type="submit">Submit</Button>
                <Button id="btns" onClick={()=>setFlipped(false)}>Cancel</Button>
                </Row>
                </Form>
                </Container>
                </BackSide>
        </Flippy>
        
    )
}

export default TripCreate;