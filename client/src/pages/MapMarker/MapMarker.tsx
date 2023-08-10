import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChromePicker } from 'react-color';

import PageLayout from '../../Pagelayout/PageLayout';
import { getMapMarkerForBerlin, getMapMarkerForParis, getMapMarkerForBrussels } from '../../API';
const colors = ['blue', 'green', 'yellow', 'Red', 'Orange', 'Black', 'pink', 'white', 'tomato'];

const MapMarker = () => {
  const [data, setData] = useState<any>([]);

  const loadData = async () => {
    try {
      const berlinData = await getMapMarkerForBerlin();
      const parisData = await getMapMarkerForParis();
      const brusselsData = await getMapMarkerForBrussels();

      setData([...berlinData.data, ...parisData.data, ...brusselsData.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('Orange');

  const [showColorPicker, setShowColorPicker] = useState(false);

  // const [itemColors, setItemColors] = useState([]);

  const handleMarkerClick = (marker: any, index: number) => {
    setSelectedMarker(marker);
    setSelectedIndex(index);

    setShowColorPicker(true);
    // setSelectedColor(itemColors[index] || "white");
  };

  // handle close marker

  const handleClosePopup = () => {
    setSelectedMarker(null);
    setShowColorPicker(false);
  };

  // To handle color from color pciker

  const handleChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  // to set the default and center data for test purpose

  const [lng, setLng] = useState(7.056497376136575);
  const [lat, setLat] = useState(51.83708176405757);

  const GERMANY_BOUNDS: [[number, number], [number, number]] = [
    [3, 40],
    [16, 56],
  ];

  return (
    <PageLayout>
      <Map
        mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
        style={{
          width: 'auto',
          height: '800px',
          borderRadius: '15px',
          border: '2px solid red',
        }}
        initialViewState={{
          longitude: 7.056497376136575,
          latitude: 51.83708176405757,
          zoom: 5,
          bounds: GERMANY_BOUNDS,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        // mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {data.map((item: any, index: any) => {
          // const backgroundColor =
          //   itemColors[index] || colors[index % colors.length];

          const backgroundColor = selectedIndex === index ? selectedColor : colors[index % colors.length];

          // const backgroundColor =
          //   selectedIndex === index
          //     ? selectedColor
          //     : colors[Math.floor(Math.random() * colors.length)];

          return (
            <Marker
              key={index}
              latitude={item.capitalInfo.latlng[0]}
              longitude={item.capitalInfo.latlng[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(item, index);
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: backgroundColor,
                }}
              />
            </Marker>
          );
        })}

        {selectedMarker ? (
          <Popup latitude={selectedMarker.capitalInfo.latlng[0]} longitude={selectedMarker.capitalInfo.latlng[1]} onClose={handleClosePopup}>
            <h6>{selectedMarker.name.common}:</h6>

            <p>Choose Your Color</p>
            <div style={{ marginTop: '20px' }}>
              {showColorPicker && <ChromePicker color={selectedColor} onChange={handleChange} />}

              {/* <input
                placeholder="add your color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <button className="btn btn-primary">Change color</button>  */}
            </div>
          </Popup>
        ) : null}

        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </Map>
    </PageLayout>
  );
};

export default MapMarker;
