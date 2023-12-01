import './App.css';
import React from 'react';
import Form from './components/Form';

function App() {
  // const [renderForm, setRenderForm] = useState(false);

  // const showForm = () => setRenderForm(true);
  // const hideForm = () => setRenderForm(false);

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      <Form />
    </div>
  );
}

export default App;
