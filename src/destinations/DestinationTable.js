
const DestinationTable=(props)=>{
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
    return (
        <div>This will be the destination table</div>
    )
}

export default DestinationTable;