import './App.css';
import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './components/About';
import Footer from './components/Footer';

// List of API keys
const apiKeys = [
  process.env.REACT_APP_API_KEY_1,
  process.env.REACT_APP_API_KEY_2,
  process.env.REACT_APP_API_KEY_3,
  process.env.REACT_APP_API_KEY_4
];

const country = 'in'

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='white'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} pgSize={5} key="general" apiKey={apiKeys[0]} country={country} category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} pgSize={5} key="bussiness" apiKey={apiKeys[0]} country={country} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} pgSize={5} key="entertainment" apiKey={apiKeys[0]} country={country} category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} pgSize={5} key="health" apiKey={apiKeys[0]} country={country} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} pgSize={5} key="science" apiKey={apiKeys[0]} country={country} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} pgSize={5} key="sports" apiKey={apiKeys[0]} country={country} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} pgSize={5} key="technology" apiKey={apiKeys[0]} country={country} category="technology" />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
