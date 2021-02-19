import React,{useState} from 'react';
import {Button,Label,Form,FormGroup, Input, Modal, ModalBody, ModalHeader} from 'reactstrap'

const TripEdit=(props)=>{
    console.log('Edit Props', props);
    const [editDesc,setEditDesc]=useState(props.tripToUpdate.description)
    const [editPlace,setEditPlace]=useState(props.tripToUpdate.place)


    const tripUpdate=(event,trip)=>{
        event.preventDefault();
        fetch(`http://localhost:3000/trip/update/${props.tripToUpdate.id}`,{
            method:"PUT",
            body:JSON.stringify({trip:{description : editDesc, place: editPlace}}),
            headers: new Headers ({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(res=>{
            props.fetchTrips();
            props.updateOff();
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Edit a trip</ModalHeader>
            <ModalBody>
                <Form onSubmit={tripUpdate}>
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>
                        <Input name="description" value={editDesc} onChange={(e)=>setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="place">Edit Definition:</Label>
                        <Input name="place" value={editPlace} onChange={(e)=>setEditPlace(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit">Update</Button>
                </Form>
            </ModalBody>
        </Modal>
    )

}

export default TripEdit