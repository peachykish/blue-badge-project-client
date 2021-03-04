
import { useState } from "react";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalHeader,
  CardImg,
  CardTitle,
  Container,
} from "reactstrap";


import "./Destinations.css"

function Entry(props) {
  const [modal, setModal] = useState(false);

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
    });
    await props.fetchSelectedDestinations();
    props.compare(item.wikidata);
  }
  const toggle = () => setModal(!modal);
  return (
    <Card key={props.item.wikidata} style={{ width: "250px", margin: "5px" }}>
      <Container>
        <CardTitle>{props.item.name}</CardTitle>
        <CardImg src={props.item.image} style={{ height: "150px" }} />
        <Button
          onClick={() => selectDestination(props.item)}
          style={{ margin: "10px" }}
        >
          Click to add
        </Button>
        <Button color="info" onClick={toggle}>
          ?
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{props.item.name}</ModalHeader>
          <ModalBody>{props.item.descr}</ModalBody>
        </Modal>
      </Container>
    </Card>
  );
}
export default Entry;
