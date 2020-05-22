import { useState, useEffect } from "react";
export const usePosition = (watch = false) => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    console.log(coords);
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    let watcher = null;
    if (watch) {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
      );
    } else {
      navigator.geolocation.getCurrentPosition(onChange, onError);
    }

    return () => watcher && navigator.geolocation.clearWatch(watcher);
  }, []);
  return { ...position, error };
};
