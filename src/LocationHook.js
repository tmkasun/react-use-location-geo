import { useEffect, useState } from "react";

const promisifiedLocation = (locationOptions) => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      const errorMessage = `Unsupported browser! Can't find the geolocation API!`;
      console.warn(errorMessage);
      reject(errorMessage);
    } else {
      const { geolocation } = navigator;
      geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (positionError) => {
          const errorMessage = `Error while retriving location ${positionError}`;
          console.error(errorMessage, positionError);
          reject(positionError);
        },
        { enableHighAccuracy: true, ...locationOptions }
      );
    }
  });
};
export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState();
  const positionTimestamp = currentLocation && currentLocation.timestamp;
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (positionTimestamp) {
        setLastUpdated(new Date() - new Date(currentLocation.timestamp));
      }
    }, 1000);
    return () => clearInterval(intervalID);
  }, [positionTimestamp]);

  const updateLocation = async () => {
    setIsLoading(true);
    try {
      const position = await promisifiedLocation();
      setCurrentLocation(position);
      setLastUpdated(0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    updateLocation();
  }, []);

  return [isLoading, currentLocation, lastUpdated, updateLocation];
};

export default useLocation;
