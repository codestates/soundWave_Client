import React from 'react';
import raintest from '../src/jeongho/rainEffect';
import './app.css';

function App() {
  return (
    <div className="app">
      hello, world!
      <div>
        {raintest()}
      </div>
    </div>
  );
}

export default App;
