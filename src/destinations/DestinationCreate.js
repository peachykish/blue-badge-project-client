import { useEffect, useState } from "react";

const DestinationCreate = (props) => {
  const [possibleDestinations, setPossibleDestinations] = useState([]);
  const limit = 7;

  useEffect(() => {
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
        //  let count=0;
        const newArray = [];
        //for(let i=0;i<usable.length&&count<limit;i++){
        for (let i = 0; i < usable.length && i < limit; i++) {
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
              //console.log({'preview':json.preview,"preview.source":json.preview.source,"wiki extracts":json.wikipedia_extracts,"wiki extracts.text":json.wikipedia_extracts.text})
              //if(img!==""&&text!==""){count++};
              newArray.push({ name: json.name, image: img, descr: text });
              
            });
        }
        console.log(newArray)
        setPossibleDestinations(newArray);
      });
  }, [props.trip]);


  // const getDisplayData = (arr)=>{
  //     let newArray=[];
  //     for(let i=0;i<arr.length&&i<limit1;i++){
  //         fetch(`https://api.opentripmap.com/0.1/en/places/xid/${arr[i].properties.xid}?apikey=${props.api_key}`)
  //         .then(res=>res.json())
  //         .then(json=>{console.log(json)
  //             let img=""
  //             if(json.preview){img=json.preview.source}
  //             newArray.push({"name":json.name,"image":img,"descr":json.wikipedia_extracts.text})
  //             return newArray}
  //             )
  //             .then((data)=>{
  //                 setPossibleDestinations(data);
  //                 setReady(true);
  //                 console.log("possD",possibleDestinations)
  //             })
  //             console.log("PD on 39",possibleDestinations)
  //     }

  // }

  return (
    <div>
        test
        {possibleDestinations?.map((entry) => <div>{entry.name}</div>)}
    </div>
  );
};

export default DestinationCreate;
