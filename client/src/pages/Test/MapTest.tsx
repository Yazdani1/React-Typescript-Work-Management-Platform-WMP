import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";

import PageLayout from "../../Pagelayout/PageLayout";

function MapTest() {
  const [lng, setLng] = useState(7.056497376136575);
  const [lat, setLat] = useState(51.83708176405757);

  //   const [lng, setLng] = useState(7.056497376136575);
  //   const [lat, setLat] = useState(51.83708176405757);

  return (
    <PageLayout>
      <div className="App">
        <h1>Mapbox tutorial</h1>
        <Map
          mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
          style={{
            width: "auto",
            height: "600px",
            borderRadius: "15px",
            border: "2px solid red",
          }}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 14,
          }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          <Marker longitude={lng} latitude={lat} />
          <NavigationControl position="bottom-right" />
          <FullscreenControl />

          <GeolocateControl />
        </Map>
      </div>
    </PageLayout>
  );
}

export default MapTest;
