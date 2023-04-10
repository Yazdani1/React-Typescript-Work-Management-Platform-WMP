import React, { useState, useEffect } from "react";

import PageLayout from "../../Pagelayout/PageLayout";

const UserLocation = () => {
  const [location, setLocation] = useState<any>({});

  const handleClick = async () => {
    // Get user's geolocation coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Fetch user's city and country from latitude and longitude
      const locationResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const locationData = await locationResponse.json();

      console.log(locationData);

      // Fetch user's IP address and geolocation data
      const ipResponse = await fetch(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=YOUR_API_KEY"
      );
      const ipData = await ipResponse.json();

      setLocation({
        city: locationData.city,
        country: locationData.countryName,
        ipAddress: ipData.ip_address,
        latitude: latitude,
        longitude: longitude,
        continent:locationData.continent,
      });
    });
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <PageLayout>
      <div>
        <button className="btn btn-primary" onClick={handleClick}>Get Location</button>
        {location.city && (
          <div>
            <p>City: {location.city}</p>
            <p>Country: {location.country}</p>
            <p>IP Address: {location.ipAddress}</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Continent:{location.continent}</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default UserLocation;
