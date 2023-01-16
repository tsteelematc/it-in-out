import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ImageMap } from "@qiuz/react-image-map";
import { Area } from '@qiuz/react-image-map';
import data from './data.json';
import { createStatus, updateStatus } from './graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { getStatus } from './graphql/queries';
import { onUpdateStatus } from './graphql/subscriptions';

interface AreaType extends Area {
  href?: string;
}

let inArray: string[] = [];

const lookup = new Map(Object.entries(data));

const overlayStyle: any = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 'bold',
  cursor: "pointer",
};

const overlayNameStyle: any = {
  overflow: "hidden"
  , whiteSpace: "nowrap"
  , textOverflow: "ellipsis"
  , width: "100%"
};

const overlayInOutStyle: any = {
  fontWeight: "normal"
  , fontSize: "12px"
};

function App() {
  console.log(lookup);

  const [inEmployees, setInEmployees] = useState(inArray);

  // const subscription = (API.graphql(
  //   graphqlOperation(onUpdateStatus)
  // ) as any).subscribe({
  //   next: (data: any) => console.log(data),
  //   error: (error: any) => console.error(error)
  // });


  const subscribeToUpdateStatus = () => {
    return (API.graphql({
      query: onUpdateStatus
    }) as any).subscribe({
        next: (data: any) => {
          console.log(data);
          setInEmployees(data.value.data.onUpdateStatus.in);
      }
    });
  };

  useEffect(
    () => {
      loadInEmployees();
      const sub = subscribeToUpdateStatus();

      return () => sub.unsubscribe();
    }
    , []
  );

  const loadInEmployees = async () => {
    try {
      const data = await API.graphql({
        query: getStatus, 
        variables: {
          id: "183dcbc8-5e2e-4bf2-8a4c-f100a776dcdf"
        }   
      });

      console.log((data as any).data.getStatus.in);
      setInEmployees((data as any).data.getStatus.in);

    } catch (err) {
      console.error('error: ', err);
    }
  };    

  const updateInEmployees = async (latest: string[]) => {
    try {
      await API.graphql({
        query: updateStatus
        , variables: {
          input: {
            id: "183dcbc8-5e2e-4bf2-8a4c-f100a776dcdf"
            , in: latest
          }
        }
      });
    }

    catch (err) {
      console.error(err);
    }
  };

  const overlayBackground = (index: string) => ({
    background: inEmployees.some(x => x == lookup.get(index)) 
      ? "rgba(0, 255, 0, 0.10)"
      : "rgba(127, 127, 127, 0.10)"
  });

  const overlayInOut = (index: string) => 
    inEmployees.some(x => x == lookup.get(index)) 
      ? "IN"
      : "OUT"
  ;

  const OverlayComponent = ({index}: any) => (
    <div
    style={overlayStyle}
    >
      <div
        style={overlayNameStyle}
      >
        {lookup.get(index)}
      </div>
      <div
        style={overlayInOutStyle}
      >
        {overlayInOut(index)}
      </div>
    </div>
  );

  const mapArea: any[] = [
    {
      left: "2%",
      top: "58%",
      height: "14%",
      width: "9%",
      style: overlayBackground("1"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="1"
        />
      ),      
    }
    , {
      left: "2%",
      top: "72.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("2"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="2"
        />
      ),      
    }
    , {
      left: "17%",
      top: "72.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("3"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="3"
        />
      ),      
    }
    , {
      left: "17%",
      top: "58%",
      height: "14%",
      width: "9%",
      style: overlayBackground("4"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="4"
        />
      ),      
    }
    , {
      left: "6%",
      top: "37%",
      height: "14%",
      width: "9%",
      style: overlayBackground("5"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="5"
        />
      ),  
    }
    , {
      left: "6%",
      top: "22.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("6"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="6"
        />
      ),        
    }
    , {
      left: "2%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("7"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="7"
        />
      ),
    }
    , {
      left: "11.25%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("8"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="8"
        />
      ),
    }
    , {
      left: "15.5%",
      top: "22.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("9"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="9"
        />
      ),        
    }
    , {
      left: "15.5%",
      top: "37%",
      height: "14%",
      width: "9%",
      style: overlayBackground("10"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="10"
        />
      ),  
    }
    , {
      left: "28.5%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("11"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="11"
        />
      ),  
    }  
    , {
      left: "37.5%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("12"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="12"
        />
      ),  
    }    
    , {
      left: "46.5%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("13"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="13"
        />
      ),  
    }    
    , {
      left: "61%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("14"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="14"
        />
      ),  
    }    
    , {
      left: "70%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("15"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="15"
        />
      ),  
    }    
    , {
      left: "79%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("16"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="16"
        />
      ),  
    }    
    , {
      left: "88%",
      top: "34.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("17"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="17"
        />
      ),  
    }    
    , {
      left: "88%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("18"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="18"
        />
      ),  
    }    
    , {
      left: "88.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("19"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="19"
        />
      ),  
    }    
    , {
      left: "79%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("20"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="20"
        />
      ),  
    }    
    , {
      left: "76.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("21"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="21"
        />
      ),  
    }   
    , {
      left: "70%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("22"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="22"
        />
      ),  
    }    
    , {
      left: "67.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("23"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="23"
        />
      ),  
    }   
    , {
      left: "61%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("24"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="24"
        />
      ),  
    }    
    , {
      left: "58.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("25"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="25"
        />
      ),  
    }   
    , {
      left: "46.5%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("26"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="26"
        />
      ),  
    }
    , {
      left: "46.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("27"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="27"
        />
      ),  
    }   
    , {
      left: "37.5%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("28"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="28"
        />
      ),  
    }
    , {
      left: "37.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("29"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="29"
        />
      ),  
    }   
    , {
      left: "28.5%",
      top: "20.5%",
      height: "14%",
      width: "9%",
      style: overlayBackground("30"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="30"
        />
      ),  
    }
    , {
      left: "28.5%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("31"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="31"
        />
      ),  
    }   
    , {
      left: "90%",
      top: "70%",
      height: "13%",
      width: "8%",
      style: overlayBackground("32"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="32"
        />
      ),  
    }   
    , {
      left: "90%",
      top: "57%",
      height: "13%",
      width: "8%",
      style: overlayBackground("33"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="33"
        />
      ),  
    }   
    , {
      left: "73%",
      top: "65%",
      height: "12%",
      width: "8%",
      style: overlayBackground("34"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="34"
        />
      ),  
    }   
    , {
      left: "74%",
      top: "82%",
      height: "13%",
      width: "8%",
      style: overlayBackground("35"),
      render: (area: any, index: number) => (
        <OverlayComponent 
          index="35"
        />
      ),  
    }   
  ];
  
  const onMapClick = async (area: AreaType, index: number) => {

    try {
      const oneBasedStringIndex = (index + 1).toString();
      // console.log(index, oneBasedStringIndex);
      await updateInEmployees(
        !inEmployees.some(x => x == lookup.get(oneBasedStringIndex))
        ? [
          ...inEmployees
          , lookup.get(oneBasedStringIndex) ?? ""
        ]
        : inEmployees.filter(x => x != lookup.get(oneBasedStringIndex))
      );
    }
    catch (e) {
      console.error(e);
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
