import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ImageMap } from "@qiuz/react-image-map";
import { Area } from '@qiuz/react-image-map';
interface AreaType extends Area {
  href?: string;
}

let inArray: string[] = ["Tom"];

const onMapClick = (area: AreaType, index: number) => {
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
  {
    left: "2%",
    top: "3%",
    height: "14%",
    width: "9%",
    style: { background: inArray.some(x => x == "Tom") ? "rgba(0, 255, 0, 0.25)": "rgba(127, 127, 127, 0.25)" },
    render: (area: any, index: number) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: 'center',
          alignContent: 'center',
          fontWeight: 'bold',
          height: '90px'
        }}
      >
        Tom
      </div>
    ),
    onMouseOver: () => console.log("map onMouseOver")
  }
];

function App() {
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
