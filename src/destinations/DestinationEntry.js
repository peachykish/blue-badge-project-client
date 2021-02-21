import { Button } from "reactstrap";
function Entry(props) {

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

  return (
    <div key={props.item.wikidata}>
      <h1>{props.item.name}</h1>
      <img src={props.item.image} />
      <p>{props.item.descr}</p>
      <Button onClick={() => selectDestination(props.item)}>
        Click to add
      </Button>
    </div>
  );
}
export default Entry;
