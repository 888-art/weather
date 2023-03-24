import React, { useState } from "react";
import "./App.css";
import { SearchCity } from "./components/Search/SearchCity";
import { WeatherContainer } from "./components/Weather/WeatherContainer";

function App() {
  const [currentCoord, setCurrentCoord] = useState<{
    latitude: string | undefined;
    longitude: string | undefined;
  }>({
    latitude: undefined,
    longitude: undefined,
  });
  return (
    <div className="App">
      <div className="searchWrap">
        <SearchCity setCurrentCoord={setCurrentCoord} />
      </div>
      <WeatherContainer
        latitude={currentCoord.latitude}
        longitude={currentCoord.longitude}
      />
    </div>
  );
}

export default App;
