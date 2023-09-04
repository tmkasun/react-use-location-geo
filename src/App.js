import "./styles.css";
import useLocation from "./LocationHook";

console.clear();

export default function App() {
  const [
    isLoading,
    currentLocation,
    lastUpdated,
    updateLocation
  ] = useLocation();
  return (
    <div className="App">
      <h1>Geo Location API with React</h1>
      <main>
        {isLoading && <div className="loading-banner">Loading . . .</div>}
        {!isLoading && currentLocation && (
          <div className="location-box">
            <div className="location-item">
              <span>Last Updated</span>
              <span className="location-value">
                {`${Math.floor(lastUpdated / 1000)}`.padStart(3, 0)} Sec ago
              </span>
            </div>
            <div className="location-item">
              <span>Accuracy</span>
              <span className="location-value">
                {currentLocation.coords.accuracy.toFixed(2)}
              </span>
            </div>

            <div className="location-item">
              <span>Altitude</span>
              <span className="location-value">
                {currentLocation.coords.altitude === undefined || -1}
              </span>
            </div>

            <div className="location-item">
              <span>Heading</span>
              <span className="location-value">
                {currentLocation.coords.heading === undefined || -1}
              </span>
            </div>
            <div className="location-item">
              <span>Latitude</span>
              <span className="location-value">
                {currentLocation.coords.latitude}
              </span>
            </div>
            <div className="location-item">
              <span>Longitude</span>
              <span className="location-value">
                {currentLocation.coords.longitude}
              </span>
            </div>
            <div className="location-item">
              <span>Speed</span>
              <span className="location-value">
                {currentLocation.coords.speed === undefined || -1}
              </span>
            </div>
          </div>
        )}
        <button onClick={() => updateLocation()}>Update</button>
      </main>
    </div>
  );
}
