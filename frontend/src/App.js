import logo from "./assets/BlueArchive.gif";
import "./App.css";
import { useRef } from "react";

const server = "http://127.0.0.1:8000/";

function App() {
  const react_feeling = useRef(false);
  fetch(server)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      react_feeling.current = data;
    });

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>Learn React</p>
        <p>React is {react_feeling.current ? "good" : "bad"}</p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=kVNSfzMDzAM"
          target="_blank"
          rel="noopener noreferrer"
        >
          &gt;&gt;Subscribe
        </a>
      </header>
    </div>
  );
}

export default App;
