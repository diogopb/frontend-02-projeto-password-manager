import './App.css';
import React, { useState } from 'react';
import Form from './components/Form';

function App() {
  const [renderForm, setRenderForm] = useState(false);

  const showForm = () => setRenderForm(true);
  const hideForm = () => setRenderForm(false);

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {/* <Form /> */}
      {renderForm ? (
        <Form onCancel={ hideForm } />
      ) : (
        <button onClick={ showForm }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
