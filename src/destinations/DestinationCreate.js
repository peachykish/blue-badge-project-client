import { useState, useEffect } from "react";
import {Button} from "reactstrap"
import Entry from './DestinationEntry'

const DestinationCreate = (props) => {
  let activeButton="all";
  let count = 0
  const [possibleDestinations, setPossibleDestinations] = useState([]) 
  const [kinds,setKinds]=useState('foods%2Csport%2Cshops%2Camusements%2Caccomodations%2Cinteresting_places')
  useEffect(() => {
    manageDestinations()
  }, [props.trip,kinds]);

  useEffect(() => {
    if (props.filteredDest){
      displayPossibleDestinations()
    }
  }, [props.filteredDest])

  useEffect(()=>displayPossibleDestinations(),[props.displayedNum])
 
  return (
    <div key={props.trip.id}>
      <Button id="categBtn" onClick={()=>setCategories("foods%2Csport%2Cshops%2Camusements%2Caccomodations%2Cinteresting_places")}>All</Button>
      <Button id="categBtn" onClick={()=>setCategories("foods")}> <i class="fa fa-cutlery"></i> Food</Button>
      <Button id="categBtn" onClick={()=>setCategories("amusements")}><i class="fa fa-bicycle"></i> Amusements</Button>
      <Button id="categBtn" onClick={()=>setCategories("shops")}><i class="fa fa-cart-plus"></i> Shopping</Button>
      <Button id="categBtn" onClick={()=>setCategories("sport")}><i class="fa fa-futbol-o"></i> Sports</Button>
      <Button id="categBtn" onClick={()=>setCategories("accomodations")}><i class="fa fa-bed"></i> Accomodations</Button>
      <Button id="categBtn" onClick={()=>setCategories("interesting_places")}><i class="fa fa-globe"></i> Interesting Places</Button>
      
      {possibleDestinations.map((entry) => (
        entry && <Entry trip_id={props.trip.id} token={props.token} item={entry} fetchSelectedDestinations={props.fetchSelectedDestinations} compare={props.compare}/>
      ))}
      {/* figure out how to hide this button when no more places to show */}
      {count<possibleDestinations.length&&<button onClick={()=>props.setDisplayedNum(props.displayedNum+6)}>Load more</button>}
    </div>
  );
  function setCategories(cats){
    count=0;
    props.setDisplayedNum(6)
    setKinds(cats);
  }
  
  function getValidPlaces(unfiltered_places){
    if ( unfiltered_places){
      return unfiltered_places.filter(data => data.properties.wikidata)
    }
  }

  function manageDestinations() {
    fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&kinds=${kinds}&lon=${props.trip.lon}&lat=${props.trip.lat}&apikey=${props.api_key}`
    )
      .then((res) => res.json())
      .then((json) => {
        let places = json.features
        console.log(json);
        let filtered = getValidPlaces(places)
        props.setFilteredDest(filtered)
      })
    }

  async function displayPossibleDestinations(){
        let resArray = []
        while(props.filteredDest.length > count  && resArray.length < props.displayedNum){
          let res = await validateDestination(props.filteredDest[count])
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