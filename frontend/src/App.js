import logo from "./assets/logo.svg";
import "./App.css";
import { useState } from "react";

const server = "http://127.0.0.1:8000/";

function App() {
	const [react_feeling, set_react_feeling] = useState('');
	const [test, setTest] = useState(true)
	if (test) {
		fetch(server)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				set_react_feeling(data)
				setTest(false)
			});
	}

	return (
		<div className="App">
		<header className="App-header">
		<div className="logo-container">
		<img src={logo} className="App-logo" alt="logo" />
		</div>
		<p>{Object.keys(react_feeling)[0]} {react_feeling[0]}</p>

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
