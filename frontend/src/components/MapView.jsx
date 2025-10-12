import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useScreen } from "../Context/ScreenProvider";

const containerStyle = {

  width: "100%",
  height: "100%",
  borderRadius: "8px",
};



const MapView = ({lat,lng}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const center = {
  lat:  parseFloat(lat) , 
  lng:parseFloat(lng), 
};

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
      
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MapView);
