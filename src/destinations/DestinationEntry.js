import {useState} from 'react';
<<<<<<< HEAD
import { Button,Modal,ModalBody,ModalHeader } from "reactstrap";
import "./Destinations.css"

=======
import { Button,Card,Modal,ModalBody,ModalHeader,CardImg,CardTitle, Container } from "reactstrap";
>>>>>>> 7ab1052699c00ec7598276678c5a2b6bc2994123
function Entry(props) {
    const [modal,setModal]=useState(false);
    
  async function selectDestination(item) {
    await fetch("http://localhost:3000/destination", {
      method: "POST",
      body: JSON.stringify({
        destination: {
          descr: item.descr,
          image: item.image,
          name: item.name,
          wikidata: item.wikidata,
          trip_id: props.trip_id,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
    await props.fetchSelectedDestinations();
  }
  const toggle=()=>setModal(!modal)
  return (
<<<<<<< HEAD
    <div key={props.item.wikidata}>
      <h1>{props.item.name}</h1>
      <img src={props.item.image} />
      <Button id="addIt" onClick={() => selectDestination(props.item)}>
=======
    <Card key={props.item.wikidata} style={{width:'250px', margin:'5px'}}>
      <Container>
      <CardTitle>{props.item.name}</CardTitle>
      <CardImg src={props.item.image} style={{height:'150px', }}/>
      <Button onClick={() => selectDestination(props.item)} style={{margin:'10px'}}>
>>>>>>> 7ab1052699c00ec7598276678c5a2b6bc2994123
        Click to add
      </Button>
      <Button id="addItQ" onClick={toggle}>?</Button>
      <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{props.item.name}</ModalHeader>
            <ModalBody>
                {props.item.descr}
            </ModalBody>
        </Modal>
        </Container>
    </Card>
   
  );
}
export default Entry;
