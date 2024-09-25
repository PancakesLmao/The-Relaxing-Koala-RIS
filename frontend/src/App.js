import logo from './logo.svg';
import './App.css';
import { useRef } from 'react'

const server = "http://127.0.0.1:8000/"

function App() {
	const react_feeling = useRef(false);
	fetch(server).then(
		response => {
			return response.json()
		}
	).then(
		data => {react_feeling.current = data},
	);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
	  {react_feeling.current["react can"]}
	  <p>
           DO NOT Learn React
	  </p>
        </p>
        <a
          className="App-link"
          href="https://go.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
	  Learn Go instead :D
        </a>
      </header>
    </div>
  );
}

export default App;
