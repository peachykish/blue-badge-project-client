import {useState} from 'react';
import {Button} from 'reactstrap';
function Entry (props){
    console.log('Are you the id', props.trip_id);
        
     function selectDestination(item){
        // const [descr, setDescr] = useState('');
        // setDescr(props.item.descr);
        // const [image, setImage] = useState('');
        // const [name, setName] = useState('');
        // const [wiki, setWiki] = useState('');
         console.log("select",item)
         console.log("Figure this out", props.trip_id);
        fetch("http://localhost:3000/destination/create", {
            method: "POST",
            body:JSON.stringify({destination:{descr:item.descr, image:item.image, name:item.name, wikidata:item.wikidata, trip_id: props.trip_id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token,
            })
        })
            .then((res) => res.json())
            .then((destinationData) => {
                console.log('destinationData',destinationData);
                console.log(item);
                // setDescr(props.item.descr);
                // setImage(props.item.image);
                // setName(props.item.name);
                // setWiki(props.item.wikidata);
                // props.fetchSelected();
            });
         }
    

    return (
        <div key={props.item.wikidata}>
            <h1>{props.item.name}</h1>
            <img src={props.item.image} />
            <p>{props.item.descr}</p>
            <Button onClick={()=>selectDestination(props.item)}>Click to add</Button>
        </div>
    )
}
export default Entry;