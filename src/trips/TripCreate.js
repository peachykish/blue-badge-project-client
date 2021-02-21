import React,{useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap'

const TripCreate=(props)=>{
    const [description,setDescription]=useState('');
    const [place,setPlace]=useState('');
    const [lat,setLat]=useState(0.00000);
    const [lon,setLon]=useState(0.00000);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response= await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${place}&apikey=${props.api_key}`);
    //     const data = await response.json();
    //     setLat(data.lat.toFixed(5));
    //     setLon(data.lon.toFixed(5));
    //     // if(lat!=0){newTrip()}
    //     newTrip();
    //    };

       const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${place}&apikey=${props.api_key}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
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
                    <Label htmlFor="place"/>Where to?
                    <Input placeholder="e.g. Seattle" name="place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description"/>
                    What's the reason?
                    <Input placeholder ="e.g. Spring Break!" name="description" value={description} 
                    onChange={(e)=>setDescription(e.target.value)}/>
                </FormGroup>

                <Button type="submit">Submit</Button>
                </Form>

        </>
    )
}

export default TripCreate;