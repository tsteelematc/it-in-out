import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ImageMap } from "@qiuz/react-image-map";
import { Area } from '@qiuz/react-image-map';
import data from './data.json';

interface AreaType extends Area {
  href?: string;
}

let inArray: string[] = ["Tom1", "Kari"];

const onMapClick = (area: AreaType, index: number) => {
  console.log(area);
  const tip = `click map${area.href || index + 1}`;
  console.log(tip);
  alert(tip);

  if (!inArray.some(x => x == "Tom")) {
    inArray = [
      ...inArray
      , "Tom"
    ]
  }
  else {
    inArray = inArray.filter(x => x != "Tom");
  }
  
};

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
    style: { background: inArray.some(x => x == "Tom") ? "rgba(0, 255, 0, 0.10)": "rgba(127, 127, 127, 0.10)" },
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
          {inArray.some(x => x == lookup.get("7")) ? "IN" : "OUT"}
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
    style: { background: inArray.some(x => x == "Kari") ? "rgba(0, 255, 0, 0.10)": "rgba(127, 127, 127, 0.10)" },
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
          {inArray.some(x => x == lookup.get("8")) ? "IN" : "OUT"}
        </div>
      </div>
    ),
    onMouseOver: () => console.log("map onMouseOver")
  }
];

const lookup = new Map(Object.entries(data));

function App() {
  
  console.log(lookup);

  const img = "https://tsteelematc.github.io/it-in-out/it-in-out-all.jpg";

  const ImageMapComponent = React.useMemo(
    () => (
      <ImageMap
        className="usage-map"
        src={img}
        map={mapArea}
        onMapClick={onMapClick}
      />
    ),
    [img]
  );

  return (
    <div className="App">
      {/* <img src="it-in-out-all.jpg" alt="" /> */}
      { ImageMapComponent }
    </div>
  );
}

export default App;
