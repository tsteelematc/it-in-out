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
  cursor: "pointer"
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
      style: overlayBackground("7"),
      render: (area: any, index: number) => (
        <div
          style={overlayStyle}
        >
          <div>
            {lookup.get("7")}
          </div>
          <div
            style={overlayInOutStyle}
          >
            {overlayInOut("7")}
          </div>
        </div>
      ),
    }
    , {
      left: "11.25%",
      top: "3%",
      height: "14%",
      width: "9%",
      style: overlayBackground("8"),
      render: (area: any, index: number) => (
        <div
          style={overlayStyle}
        >
          <div>
            {lookup.get("8")}
          </div>
          <div
            style={overlayInOutStyle}
          >
            {overlayInOut("8")}
          </div>
        </div>
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
