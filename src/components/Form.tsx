import React, { useState } from 'react';

type FormProps = {
  onCancel: () => void;
  // registerPassword: (event: NewRegister) => void;
};

type NewRegister = {
  service: string;
  login: string;
  password: string;
  url: string;
};

function Form({ onCancel }: FormProps) {
  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [renderForm, setRenderForm] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [registers, setRegister] = useState<NewRegister[]>([]);

  function handleChangePassword() {
    const validPassword = password.length >= 8
      && password.length <= 16
      && /[a-zA-z]+/.test(password)
      && /\d/.test(password)
      && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setButtonEnable(validPassword);
  }

  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  const toggleForm = () => {
    setRenderForm(!renderForm);
  };

  const registering = (event: React.FormEvent) => {
    event.preventDefault();
    const registerService: NewRegister = {
      service: '',
      login: '',
      password: '',
      url: '',
    };
    setRegister([...registers, registerService]);
    setService('');
    setLogin('');
    setPassword('');
    setUrl('');
  };

  return (
    <div>
      {!renderForm ? (
        <button onClick={ toggleForm }>Cadastrar nova senha</button>
      ) : (
        <form onSubmit={ registering }>
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
            <p className={ password.length < 8 ? invalid : valid }>
              Possuir 8 ou mais caracteres
            </p>

            <p className={ password.length < 16 ? valid : invalid }>
              Possuir até 16 caracteres
            </p>

            <p
              className={
                /[a-zA-z]+/.test(password) && /\d/.test(password)
                  ? valid
                  : invalid
              }
            >
              Possuir letras e números
            </p>

            <p
              className={
                /[!@#$%^&*(),.?":{}|<>]/.test(password) ? valid : invalid
              }
            >
              Possuir algum caractere especial
            </p>
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
      )}
      { registers.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        <div>
          <ul>
            {
            registers.map((register, index) => (
              <li key={ index }>
                <a href={ register.url }>{ register.service }</a>
                <p>
                  Login
                  {' '}
                  { register.login }
                </p>
                <p>
                  Senha
                  {' '}
                  { register.password }
                </p>
              </li>
            ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default Form;
