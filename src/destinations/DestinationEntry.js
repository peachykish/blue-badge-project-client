import {Button} from 'reactstrap'
function Entry (props){
    console.log("entry props",props)
        
     function selectDestination(item){
         console.log("select",item)
        fetch("http://localhost:3000/destination", {
            method: "POST",
             body:JSON.stringify({destination:{descr:item.descr,image:item.image,name:item.name,wikidata:item.wikidata,trip_id:props.trip_id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token,
            })
        })
            .then((res) => res.json())
            .then((destinationData) => {
                console.log('destinationData',destinationData);
    //             props.fetchSelected();
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