import { useState } from "react";
import APIURL from '../helpers/environment';
import {
  Button,
  Row,
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
    await fetch(`${APIURL}/destination`, {
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
    <Card key={props.item.wikidata} style={{ width: "250px", margin: "5px" , boxShadow: '0 4px 8px 0 rgba(0,0,0,.2)'}}>
      <Container>
        <CardTitle>{props.item.name}</CardTitle>
        <CardImg src={props.item.image} style={{ height: "150px" }} />
        <Row style={{margin:'10px',marginTop:'10px',justifyContent: 'center'}}><Button id="addIt"
          onClick={() => selectDestination(props.item)}
          
        >
          Click to add
        </Button>

        <Button id="addItQ" color="info" onClick={toggle}>
          ?
        </Button>
        </Row>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{props.item.name}</ModalHeader>
          <ModalBody>{props.item.descr}</ModalBody>
        </Modal>
      </Container>
    </Card>
  );
}
export default Entry;