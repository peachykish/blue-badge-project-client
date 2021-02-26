import React,{useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap'
import "./Trips.css"

const TripCreate=(props)=>{
    const [description,setDescription]=useState('');
    const [place,setPlace]=useState('');
    const [lat,setLat]=useState(0.00000);
    const [lon,setLon]=useState(0.00000);

       const handleSubmit = (e) => {
        e.preventDefault();
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
        <>
            <h3>Create a new trip</h3>
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
                </Form>

        </>
    )
}

export default TripCreate;