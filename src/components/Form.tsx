import React, { useState } from 'react';

type FormProps = {
  onCancel: () => void;
};

function Form({ onCancel }: FormProps) {
  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [buttonEnable, setButtonEnable] = useState(false);

  function handleChangePassword() {
    const validPassword = password.length >= 8
      && password.length <= 16
      && /[a-zA-z]+/.test(password)
      && /\d/.test(password)
      && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setButtonEnable(validPassword);
  }

  return (
    <form action="">

      <div>
        <label htmlFor="Service">Nome do serviço</label>
        <input
          type="text"
          name="Service"
          id="Service"
          value={ service }
          onChange={ (event) => setService(event.target.value) }
        />
      </div>

      <div>
        <label htmlFor="Login">Login</label>
        <input
          type="text"
          name="Login"
          id="Login"
          value={ login }
          onChange={ (event) => setLogin(event.target.value) }
        />
      </div>

      <div>
        <label htmlFor="Senha">Senha</label>
        <input
          type="password"
          name="Senha"
          id="Senha"
          minLength={ 8 }
          maxLength={ 16 }
          value={ password }
          onChange={ (event) => {
            setPassword(event.target.value);
            handleChangePassword();
          } }
        />
      </div>

      <div>
        <label htmlFor="URL">URL</label>
        <input
          type="text"
          name="URL"
          id="URL"
          value={ url }
          onChange={ (event) => setUrl(event.target.value) }
        />
      </div>

      <button
        type="submit"
        disabled={ !service || !login || !buttonEnable || !url }
      >
        Cadastrar
      </button>
      <button onClick={ onCancel }>Cancelar</button>
    </form>
  );
}

export default Form;
