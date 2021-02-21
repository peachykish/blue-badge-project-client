import { useState, useEffect, useRef } from "react";
import Entry from './DestinationEntry'

const DestinationCreate = (props) => {
  const [possibleDestinations, setPossibleDestinations] = useState([]) 
  const [filteredDest, setFilteredDest] = useState([])
  const displayedNum = 6;
  useEffect(() => {
    manageDestinations()
  }, [props.trip]);

  useEffect(() => {
    if (filteredDest){
      displayDestinations()
    }
  }, [filteredDest])

  return (
    <div key={props.trip.id}>
      This is where you'll pick some destinations.
      {possibleDestinations.map((entry) => (
        entry && <Entry trip_id={props.trip.id} token={props.token} item={entry}/>
      ))}
    </div>
  );
  
  function getValidPlaces(unfiltered_places){
    if ( unfiltered_places){
      return unfiltered_places.filter(data => data.properties.wikidata)
    }
  }

  function manageDestinations() {
    const limit = 7;
    fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=${props.trip.lon}&lat=${props.trip.lat}&apikey=${props.api_key}`
    )
      .then((res) => res.json())
      .then((json) => {
        let places = json.features
        let filtered = getValidPlaces(places)
        setFilteredDest(filtered)
      })
    }

  async function displayDestinations(){
        let resArray = []
        let count = 0
        while(filteredDest.length > count  && resArray.length < displayedNum){
          let res = await validateDestination(filteredDest[count])
          if (res){
            let wikidataArray=resArray.map((i)=>i.wikidata)
            if(!wikidataArray.includes(res.wikidata)) {
            resArray.push(res)
            }
          }
          count++

        }
        setPossibleDestinations(resArray)
      }


    async function validateDestination(checkDest){
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        while (true){
          let res = await fetch(
            `https://api.opentripmap.com/0.1/en/places/xid/${checkDest.properties.xid}?apikey=${props.api_key}`
          )
          if (res.status != 200){
              await delay(1000)
              continue
          } else {
            let json = await res.json()
            let img = "";
            let text = "";
            if (json.preview) {
              if (json.preview.source) {
                img = json.preview.source;
              }
            }
            if (json.wikipedia_extracts) {
              if (json.wikipedia_extracts.text) {
                text = json.wikipedia_extracts.text;
              }
            }
            if (img != "" && text != "") {
              return { "name": json.name, "image": img, "descr": text, "wikidata": json.wikidata }
            }
            return 
          }
        }
    }
};

export default DestinationCreate;
