import { useEffect } from "react";

const DestinationCreate = (props) => {
  console.log("pops from create", props.possibleDestinations);
  //useEffect(() => {}, [props.possibleDestinations]);

  return (
    <div>
      test1
      {props.possibleDestinations?.map((entry) => {
        <div>
          huh?
          <h1>{entry.name}</h1>
        </div>
      })}
    </div>
  );
};

export default DestinationCreate;
