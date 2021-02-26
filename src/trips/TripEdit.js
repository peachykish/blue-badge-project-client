import React,{useState} from 'react';
import {Button,Label,Form,FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap'


const TripEdit=(props)=>{
    const [editDesc,setEditDesc]=useState(props.tripToUpdate.description)
    const [editPlace,setEditPlace]=useState(props.tripToUpdate.place)
    const [lat,setLat]=useState(0.00000);
    const [lon,setLon]=useState(0.00000);

    const fetchEditTrips = (e) => {
        e.preventDefault();
        const api_key='5ae2e3f221c38a28845f05b60282c4994410542a110ccc5c7ff90aa1';

        fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${editPlace}&apikey=${api_key}`)
        .then(response=>response.json())
        .then(data=>{
            setLat(data.lat);
            setLon(data.lon);
            return [data.lat,data.lon]
        })
        .then((data)=>{
            tripUpdate(data[0], data[1])
        });
       };

    const tripUpdate=(latitude, longitude)=>{
        fetch(`http://localhost:3000/trip/${props.tripToUpdate.id}`,{
            method:"PUT",
            body:JSON.stringify({trip:{description : editDesc, place: editPlace, lat: latitude, lon: longitude}}),
            headers: new Headers ({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(res=> res.json())
        .then(() => {
            props.fetchTrips();
            props.updateOff();
        });
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Edit a trip</ModalHeader>
            <ModalBody>
                <Form type="submit" onSubmit={fetchEditTrips}>
                    <FormGroup>
                        <Label htmlFor="description">Edit the Reason:</Label>
                        <Input name="description" value={editDesc} onChange={(e)=>setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="place">Edit the Place:</Label>
                        <Input name="place" value={editPlace} onChange={(e)=>setEditPlace(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit">Update</Button>
                </Form>
            </ModalBody>
        </Modal>
    )

}

export default TripEdit