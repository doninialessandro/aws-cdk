import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState("Click LOAD DATA button to see the MAGIC");

  const fetchData = async () => {
    const myData = await fetch("https://your-api-endpoint.amazonaws.com/prod/");
    setData(JSON.stringify(await myData.json()));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={() => fetchData()}>Load Data</button>
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
