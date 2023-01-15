import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ImageMap } from "@qiuz/react-image-map";
import { Area } from '@qiuz/react-image-map';
import data from './data.json';
import { createStatus } from './graphql/mutations';
import { API } from 'aws-amplify';

interface AreaType extends Area {
  href?: string;
}

let inArray: string[] = [];

const lookup = new Map(Object.entries(data));

function App() {
  console.log(lookup);

  const [inEmployees, setInEmployees] = useState(inArray);

  const mapArea: any[] = [
    {}
    , {}
    , {}
    , {}
    , {}
    , {}
    , {
      left: "2%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: { background: inEmployees.some(x => x == lookup.get("7")) ? "rgba(0, 255, 0, 0.10)": "rgba(127, 127, 127, 0.10)" },
      render: (area: any, index: number) => (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 'bold',
          }}
        >
          <div>
            {lookup.get("7")}
          </div>
          <div
            style={{
              fontWeight: "normal"
              , fontSize: "12px"
            }}
          >
            {inEmployees.some(x => x == lookup.get("7")) ? "IN" : "OUT"}
          </div>
        </div>
      ),
      onMouseOver: () => console.log("map onMouseOver")
    }
    , {
      left: "11.25%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: { background: inEmployees.some(x => x == lookup.get("8")) ? "rgba(0, 255, 0, 0.10)": "rgba(127, 127, 127, 0.10)" },
      render: (area: any, index: number) => (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 'bold',
          }}
        >
          <div>
            {lookup.get("8")}
          </div>
          <div
            style={{
              fontWeight: "normal"
              , fontSize: "12px"
            }}
          >
            {inEmployees.some(x => x == lookup.get("8")) ? "IN" : "OUT"}
          </div>
        </div>
      ),
      onMouseOver: () => console.log("map onMouseOver")
    }
  ];
  
  const onMapClick = (area: AreaType, index: number) => {
    const oneBasedStringIndex = (index + 1).toString();

    console.log(index, oneBasedStringIndex);
  
    if (!inEmployees.some(x => x == lookup.get(oneBasedStringIndex))) {
      setInEmployees([
        ...inEmployees
        , lookup.get(oneBasedStringIndex) ?? ""
      ]);
    }
    else {
      setInEmployees(inEmployees.filter(x => x != lookup.get(oneBasedStringIndex)));
    }
  };
  
  const img = "https://tsteelematc.github.io/it-in-out/it-in-out-all.jpg";

  // Run once...
  // const foo = async () => {
  //   await API.graphql({
  //     query: createStatus,
  //     variables: { 
  //       input: {
  //         name: 'inEmployees'
  //         , in: ["Tom"]
  //       } 
  //     }
  //   });
  // }

  // foo();

  return (
    <div className="App">
      {/* <img src="it-in-out-all.jpg" alt="" /> */}
      {/* { ImageMapComponent } */}
      <ImageMap
        className="usage-map"
        src={img}
        map={mapArea}
        onMapClick={onMapClick}
      />
    </div>
  );
}

export default App;
