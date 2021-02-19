import { useState,useEffect } from "react";

const DestinationCreate = (props) => {
  const [possibleDestinations,setPossibleDestinations]=useState({});
  console.log("props from create", props);
  
  const manageDestinations=()=>{
    setPossibleDestinations([]);
    const limit = 7;
    console.log("trip",props.trip)
    fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=${props.trip.lon}&lat=${props.trip.lat}&apikey=${props.api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          let filtered = json.features;
          let haveWikidata = [];
          for (let i = 0; i < filtered.length; i++) {
            if (filtered[i].properties.wikidata) {
              haveWikidata.push(filtered[i]);
            }
          }
          return haveWikidata;
        })
        .then((usable) => {
          let count=0;
          console.log("limit",limit)
          //for(let i=0;i<usable.length&&newArray.length<limit;i++){
          for (let i = 0; i < usable.length&&i<limit ; i++) {
          // if(count==limit) {break;}
            fetch(
              `https://api.opentripmap.com/0.1/en/places/xid/${usable[i].properties.xid}?apikey=${props.api_key}`
            )
              .then((res) => res.json())
              .then((json) => {
                let img = "";
                let text = "";
                if (json.preview) {
                    if(json.preview.source) {
                      img = json.preview.source;
                    }
                }
                if (json.wikipedia_extracts) {
                    if(json.wikipedia_extracts.text){
                      text = json.wikipedia_extracts.text;
                    }
                }
                console.log("test",img==""||text=="")
                console.log("count",count);
                if(img==""||text==""){} else{ 
                    count++;
                setPossibleDestinations([{ "name": json.name, "image": img, "descr": text,"wikidata":json.wikidata }].concat(possibleDestinations))
        
              };
          }
          
        )
    }
  }
        )
}

  useEffect(() => {manageDestinations()}, [props.trip]);

  const displayer=(item)=>{
    return(<div key={item.wikidata}>
          <h1>{item.name}</h1>
          <img src={item.image}/>
          <p>{item.descr}</p>

        </div>)
  }

  return (
    <div key={props.trip.id}>
      This is where you'll pick some destinations.
      {possibleDestinations.places?.map((entry) => displayer(entry))}
    </div>
  );
};

export default DestinationCreate;
