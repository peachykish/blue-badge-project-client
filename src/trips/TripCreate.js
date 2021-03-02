import React,{useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap'
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
      
        <Flippy flipOnClick={false} isFlipped={flipped} style={{margin:"15px",
        height: "300px",
        width: "300px",
        textAlign: "left",
                 
          }}>
            <FrontSide style={{
        backgroundColor:"grey",
            
          }} onClick={()=>{setFlipped(true)}}>
              <span style={{fontSize:"230px",position:"absolute",top:"-14%",left:'26%',color:"beige"}}>+</span>
          </FrontSide>
            <BackSide style={{
        backgroundColor:"grey",
            
          }}>
            <Form type='submit' onSubmit={handleSubmit}>
            <FormGroup>
                    <Label  htmlFor="place"/>Where to?
                    <Input id="whereTo" placeholder="e.g. Seattle" name="place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label  htmlFor="description"/>
                    What's the reason?
                    <Input id="whereTo" placeholder ="e.g. Spring Break!" name="description" value={description} 
                    onChange={(e)=>setDescription(e.target.value)}/>
                </FormGroup>

                <Button type="submit">Submit</Button>
                <Button onClick={()=>setFlipped(false)}>Cancel</Button>
                </Form>
                </BackSide>
        </Flippy>
        
    )
}

export default TripCreate;