import './App.css';
import React from 'react';
import Form from './components/Form';

function App() {
  return (
    <div>
      <div
        className="bg-stone-200
        shadow-lg flex flex-col font-bold py-4 text-5xl"
      >
        <h1>Password Manager</h1>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}

export default App;
