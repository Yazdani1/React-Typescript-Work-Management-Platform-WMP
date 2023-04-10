import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { BsPinMapFill } from "react-icons/bs";
import { GiSatelliteCommunication } from "react-icons/gi";
//Custom
import { getSingleHomeRentalDetails } from "../../API";
import PageLayout from "../../Pagelayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import { HomeRentalItems } from "../../Dataprovider";
import style from "./HomeRental.module.scss";

const HomeRentalDetails = () => {
  const { id } = useParams();

  //////////////////////////////////////////////////////
  ///////Single Home Rental   //////////////////////////
  //////////////////////////////////////////////////////

  const [singleHomeRental, setSingleHomeRental] = useState<HomeRentalItems | any>(
    null
  );
  const [lng, setLng] = useState<number | any>(8.524671002836843);
  const [lat, setLat] = useState<number | any>(52.13172119845984);

  const loadSingleHomeRental = async () => {
    try {
      const res = await getSingleHomeRentalDetails(id!);

      if (res) {
        setSingleHomeRental(res.data);

        // to set the latitude and longitude
        setLng(res.data.latitude);
        setLat(res.data.longitude);
        // setLng(parseInt(res.data.latitude));
        // setLat(parseInt(res.data.longitude));
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    loadSingleHomeRental();
  }, []);

  // to select photo and show in the large single view

  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleImageSelect = (index: number) => {
    setCurrentImage(index);
  };

  const GERMANY_BOUNDS: [[number, number], [number, number]] = [
    [3, 40],
    [16, 56]
  ];

  return (
    <PageLayout>
      <CardLayout backgroun_color="white">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h3>{singleHomeRental?.title}</h3>
        <h6>{singleHomeRental?.price}</h6>
        <div className={style.imageViewContainer}>

          <div className={style.allImageListDesign}>
            {singleHomeRental?.photo.map((p: any, index: number) => (
              <div
                onMouseEnter={() => handleImageSelect(index)}
                className={
                  currentImage === index
                    ? style.selectedImageDesign
                    : style.imagePreviewList
                }
                onClick={() => handleImageSelect(index)}
              >
                <img src={p} height="100px" width="100px" />
              </div>
            ))}
          </div>

          <div className={style.singleImageViewDesign}>
            <img src={singleHomeRental?.photo[currentImage]} height="400px" />
          </div>
          
        </div>
      </CardLayout>
      <CardLayout backgroun_color="white">
        <p>
          Lang:{lng}lat:{lat}
        </p>
        <Map
          mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
          style={{
            width: "auto",
            height: "600px",
            borderRadius: "15px",
          }}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 1,
            bounds:GERMANY_BOUNDS
          }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          <Marker latitude={lat} longitude={lng}>
            <p>
              <BsPinMapFill size={40} color="yellow" />
            </p>
          </Marker>
          <NavigationControl position="bottom-right" />
          <FullscreenControl />
          <GeolocateControl />
        </Map>
      </CardLayout>
    </PageLayout>
  );
};

export default HomeRentalDetails;
