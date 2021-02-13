import React,{useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap'

const TripCreate=(props)=>{
    const [description,setDescription]=useState('');
    const [place,setPlace]=useState('');
    const [lat,setLat]=useState(0.0);
    const [lon,setLon]=useState(0.0);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/trip", {
            method: "POST",
            body:JSON.stringify({log:{description:description,lat:lat,lon:lon}}),
            headers: new Headers({
             'Content-Type': 'application/json',
              'Authorization': props.token,
           })
         })
           .then((res) => res.json())
           .then((tripData) => {
               console.log(tripData);
               setDescription('');
               setLat(0.0);
               setLon(0.0);
               props.fetchTrips();
           });
       };

    return(
        <>
            <h3>Create a new trip</h3>
            <Form type='submit' onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description"/>
                    <Input name="description" value={description} 
                    onChange={(e)=>setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="place"/>
                    <Input name="place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                </FormGroup>

                <Button type="submit">Submit</Button>
                </Form>
        </>
    )
}

export default TripCreate;