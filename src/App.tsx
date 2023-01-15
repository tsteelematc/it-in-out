import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ImageMap } from "@qiuz/react-image-map";
import { Area } from '@qiuz/react-image-map';
interface AreaType extends Area {
  href?: string;
}

const onMapClick = (area: AreaType, index: number) => {
  const tip = `click map${area.href || index + 1}`;
  console.log(tip);
  alert(tip);
};

const mapArea: any[] = [
  {
    left: "0%",
    top: "6%",
    height: "12%",
    width: "33%",
    style: { background: "rgba(255, 0, 0, 0.5)" },
    onMouseOver: () => console.log("map onMouseOver")
  },
  {
    width: "33%",
    height: "12%",
    left: "0%",
    top: "36.37931034482759%",
    style: { background: "rgba(255, 0, 0, 0.5)" },
    render: (area: any, index: number) => (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 0, 0.5)"
        }}
      >
        can render map node
      </span>
    ),
    onMouseOver: () => console.log("map onMouseOver")
  }
];

function App() {
  const img = "https://tsteelematc.github.io/it-in-out/in-out-all.jpg";
  // const img = "https://i.etsystatic.com/28692092/r/il/d13717/2975668784/il_1588xN.2975668784_nj6x.jpg";

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
