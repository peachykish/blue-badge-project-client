import {useState} from 'react';
import { Button,Modal,ModalBody,ModalHeader } from "reactstrap";
import "./Destinations.css"

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
    <div key={props.item.wikidata}>
      <h1>{props.item.name}</h1>
      <img src={props.item.image} />
      <Button id="addIt" onClick={() => selectDestination(props.item)}>
        Click to add
      </Button>
      <Button id="addItQ" onClick={toggle}>?</Button>
      <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{props.item.name}</ModalHeader>
            <ModalBody>
                {props.item.descr}
            </ModalBody>
        </Modal>
    </div>
  );
}
export default Entry;
