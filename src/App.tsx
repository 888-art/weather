import React, { useState } from "react";
import "./App.css";
import { SearchCity } from "./components/Search/SearchCity";
import { WeatherContainer } from "./components/Weather/WeatherContainer";
import type { ICoordinate } from "./models/common.model";
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  const [currentCoord, setCurrentCoord] = useState<ICoordinate>({
    latitude: undefined,
    longitude: undefined,
  });
  return (
    <div className="App">
      <Title style={{ color: "#fff" }}>Enter city</Title>
      <div className="search-wrap">
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
