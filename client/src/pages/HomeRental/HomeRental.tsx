import { useEffect, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SiGooglemaps } from "react-icons/si";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";

//Custom
import PageLayout from "../../Pagelayout/PageLayout";
import style from "./HomeRental.module.scss";
import { getAllHomeRental } from "../../API";
import CardLayout from "../../components/CardLayout";
import HomeRentalCard from "./HomeRentalCard";
import { HomeRentalItems } from "../../Dataprovider";

const HomeRental = () => {
  //////////////////////////////////////////////////////
  /////////////Get Home Rental   ///////////////////////
  //////////////////////////////////////////////////////

  const [allHomeRental, setAllHomeRental] = useState<HomeRentalItems[]>([]);

  const loadAllHomeRental = async () => {
    try {
      const res = await getAllHomeRental();

      if (res) {
        setAllHomeRental(res.data);
      }
    } catch (error: any) {
      
    }
  };

  //////////////////////////////////////////////////////
  /////////////Select Map Marker ///////////////////////
  //////////////////////////////////////////////////////
  const [selectedMarker, setSelectedMarker] = useState<HomeRentalItems | null>(
    null
  );
  const handleMarkerClick = (marker: HomeRentalItems) => {
    setSelectedMarker(marker);
  };

  // to show map marker in the center need to put initital cordinate value-- these default cordinate to show the map icon
  // in the center of the map then based on the api value it will show the correct location.

  const [lng, setLng] = useState(7.056497376136575);
  const [lat, setLat] = useState(51.83708176405757);

  useEffect(() => {
    loadAllHomeRental();
  }, []);

  return (
    <PageLayout>
      <div className="container-fluid">
        <h1>{allHomeRental[3]?.longitude}</h1>
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            {allHomeRental &&
              allHomeRental.map((item) => <HomeRentalCard homerental={item} />)}
          </div>

          <div className="col-xl-8 col-lg-8">
            <div
              style={{ position: "fixed", width: "1000px", height: "1000px" }}
            >
              <CardLayout backgroun_color="white">
                <Map
                  mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
                  style={{
                    width: "auto",
                    height: "900px",
                  }}
                  initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 6,
                  }}
                  mapStyle="mapbox://styles/mapbox/dark-v11"
                >
                  {allHomeRental &&
                    allHomeRental.map((item, index: number) => {
                      return (
                        <Marker
                          key={index}
                          latitude={item.longitude}
                          longitude={item.latitude}
                          onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            handleMarkerClick(item);
                          }}
                        >
                          <div>
                            <p>
                              <SiGooglemaps size={40} color="yellow" />
                            </p>
                            <p
                              style={{
                                background: "tomato",
                                padding: "5px",
                                borderRadius: "4px",
                                color: "white",
                              }}
                            >
                              ${item.price}
                            </p>
                          </div>
                        </Marker>
                      );
                    })}

                  {/* To show popover */}

                  {selectedMarker ? (
                    <Popup
                      latitude={selectedMarker.longitude}
                      longitude={selectedMarker.latitude}
                      onClose={() => {
                        setSelectedMarker(null);
                      }}
                      style={{ background: "red" }}
                    >
                      <h6>{selectedMarker.price}.EUR</h6>
                      <p>{selectedMarker.des}</p>
                      <Link to={"/home-rental-details/" + selectedMarker._id}>
                        <button className="btn btn-primary">
                          View details
                        </button>
                      </Link>
                    </Popup>
                  ) : null}

                  <NavigationControl position="top-left" />
                  <FullscreenControl />
                  <GeolocateControl />
                </Map>
              </CardLayout>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomeRental;
