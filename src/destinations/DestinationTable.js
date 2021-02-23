import {useEffect} from 'react'
import {Table,Button} from 'reactstrap'
const DestinationTable=(props)=>{
    console.log("dt props",props)
    useEffect(()=>props.fetchSelectedDestinations(),[props.trip])

    const deleteDestination=(destination)=>{
        fetch(`http://localhost:3000/destination/${destination.id}`,{
            method:'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(()=>{
            console.log("delete");
            props.fetchSelectedDestinations()
        })
    }

     const selectedDestinationsMapper=()=>{
        
         return props.selectedDestinations.map((destination)=>{
            return(
                <div key={destination.id}>
                    <h1 >{destination.name}</h1>
                    <img src={destination.image} alt={destination.name}/>
                    <p>{destination.descr}</p>
                     <Button color ="danger" onClick={()=>deleteDestination(destination)}>Delete</Button>
                 </div>
             )
         })
     }

    
     return(
         <>
        <h3>Destination Table</h3>
                       {props.selectedDestinations.length==0?useEffect:selectedDestinationsMapper()}

        </>
     )
}

export default DestinationTable;