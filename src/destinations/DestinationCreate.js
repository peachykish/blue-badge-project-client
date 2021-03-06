import { useState, useEffect } from "react";
import {Button,Container,Row} from "reactstrap"
import Entry from './DestinationEntry'
import "./Destinations.css"

const DestinationCreate = (props) => {
  let count = 0
  const [kinds,setKinds]=useState('foods%2Csport%2Cshops%2Camusements%2Caccomodations%2Cinteresting_places')
  const [color1, setColor1] = useState('gray');
  const [color2, setColor2] = useState('white');
  const [color3, setColor3] = useState('white');
  const [color4, setColor4] = useState('white');
  const [color5, setColor5] = useState('white');
  const [color6, setColor6] = useState('white');
  const [color7, setColor7] = useState('white');

  function setClick(buttonNumber){
    buttonNumber == 1 ? setColor1('gray') : setColor1('white');
    buttonNumber == 2 ? setColor2('gray') : setColor2('white');
    buttonNumber == 3 ? setColor3('gray') : setColor3('white');
    buttonNumber == 4 ? setColor4('gray') : setColor4('white');
    buttonNumber == 5 ? setColor5('gray') : setColor5('white');
    buttonNumber == 6 ? setColor6('gray') : setColor6('white');
    buttonNumber == 7 ? setColor7('gray') : setColor7('white');
  }
  useEffect(() => {
    manageDestinations()
  }, [props.trip,kinds]);

  useEffect(() => {
    if (props.filteredDest){
      displayPossibleDestinations()
    }
  }, [props.filteredDest])

  useEffect(()=>displayPossibleDestinations(),[props.displayedNum])

  const myStyle1 = {
    backgroundColor: color1,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
  const myStyle2 = {
    backgroundColor: color2,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
  const myStyle3 = {
    backgroundColor: color3,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
  const myStyle4 = {
    backgroundColor: color4,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
  const myStyle5 = {
    backgroundColor: color5,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
  const myStyle6 = {
    backgroundColor: color6,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
  const myStyle7 = {
    backgroundColor: color7,
    borderBottom: '5px solid #252532',
    borderTop: '5px solid #252532',
    borderRight: '5px solid #252532',
    borderLeft: '5px solid #252532',
    transform: 'skew(10deg)',
    color: 'black',
    margin: '2px',
    fontSize: 'small',
    marginBottom: '10px'
  }
 
  return (
    <Container fluid >
    <Row  style={{margin:'auto',justifyContent: 'center'}}><h3>Places to explore:</h3></Row>
    <Row  style={{margin:'auto',justifyContent: 'center'}}>
      <Button style={myStyle1} onClick={()=>{setCategories("foods%2Csport%2Cshops%2Camusements%2Caccomodations%2Cinteresting_places"); setClick(1)}}>All</Button>
      <Button style={myStyle2} onClick={()=>{setCategories("foods"); setClick(2)}}> <i class="fa fa-cutlery"></i> Food</Button>
      <Button style={myStyle3} onClick={()=>{setCategories("amusements"); setClick(3)}}><i class="fa fa-bicycle"></i> Amusements</Button>
      <Button style={myStyle4} onClick={()=>{setCategories("shops"); setClick(4)}}><i class="fa fa-cart-plus"></i> Shopping</Button>
      <Button style={myStyle5} onClick={()=>{setCategories("sport"); setClick(5)}}><i class="fa fa-futbol-o"></i> Sports</Button>
      <Button style={myStyle6} onClick={()=>{setCategories("accomodations"); setClick(6)}}><i class="fa fa-bed"></i> Accomodations</Button>
      <Button style={myStyle7} onClick={()=>{setCategories("interesting_places"); setClick(7)}}><i class="fa fa-globe"></i> Interesting Places</Button>
      </Row>
      <Row fluid style={{margin:'auto',justifyContent: 'center'}}>
      {props.possibleDestinations?.map((entry) => (
        entry && <Entry trip_id={props.trip.id} token={props.token} item={entry} fetchSelectedDestinations={props.fetchSelectedDestinations} compare={props.compare}/>
      ))}


       {count<props.possibleDestinations?.length ? <Button style={{ width: "250px", height:"250px", margin: "5px", boxShadow: '0 4px 8px 0 rgba(0,0,0,.2)'}} 
                                                  onClick={()=>props.setDisplayedNum(props.displayedNum+6)}>Load more</Button> : <></>
     }
     </Row>
     </Container>
  );
  function setCategories(cats){
    count=0;
    props.setDisplayedNum(6)
    setKinds(cats);
  }
  
  function getValidPlaces(unfiltered_places){
      return unfiltered_places?.filter(data => data.properties.wikidata)
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
        let selectedWikis=props.selectedDestinations?.map((i)=>i.wikidata);
        while(props.filteredDest?.length > count  && resArray.length < props.displayedNum){
          let res = await validateDestination(props.filteredDest[count])
          if (res){
            let wikidataArray=resArray.map((i)=>i.wikidata)
            if(!wikidataArray.includes(res.wikidata)&&!selectedWikis.includes(res.wikidata)) {
            resArray.push(res)
            }
          }
          count++

        }
        props.setPossibleDestinations(resArray)
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