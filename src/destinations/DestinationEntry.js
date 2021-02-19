import {useEffect} from 'react'
function Entry ({item}){
    return (
        <div key={item.wikidata}>
            <h1>{item.name}</h1>
            <img src={item.image} />
            <p>{item.descr}</p>
        </div>
    )
}
export default Entry;