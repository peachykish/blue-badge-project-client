import { useEffect, useState } from "react"

const DestinationCreate=(props)=>{
    const [possibleDestinations,setPossibleDestinations]=useState([]);
    const limit=40;
    const [ready,setReady]=useState(false);    
    useEffect(()=> {
        console.log("trip")
        fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=${props.trip.lon}&lat=${props.trip.lat}&apikey=${props.api_key}`)
        .then(res=>res.json())
        .then(json=>{
            let info=[];
            for(let i=0;i<limit;i++){
                 let name=json.features[i].properties.name;
                 let xid=json.features[i].properties.xid;
                 if(name!=""&&xid!=""){
                     info.push({"name":name,"xid":xid})
                 }
             }
            setPossibleDestinations(info);
            setReady(true);
            console.log("possible destinations",possibleDestinations)
        })
    },[])

    const possibleMapper=(item)=>{
        return(
            <div>
                <h1>{item.name}</h1>
                <p>{item.xid}</p>

            </div>
        )
    }
    if(!ready){
        return(
            <p>Loading...</p>
        )
    } else if(possibleDestinations.length==0){
        return (
            <p>No destinations found</p>
        )
    } else {
        console.log("pd",possibleDestinations)
    return (
        <div>
            {possibleDestinations.map((item)=>possibleMapper(item))}
        </div>
    )
    }
}

export default DestinationCreate;