import React, { useState } from 'react';

type NewRegister = {
  service: string;
  login: string;
  password: string;
  url: string;
};

function Form() {
  const handleEnableForm = () => {
    setButtonEnable(!buttonEnable);
  };

  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [buttonEnable, setButtonEnable] = useState(false);
  const [registers, setRegister] = useState<NewRegister[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    const registerService: NewRegister = {
      service,
      login,
      password,
      url,
    };
    setRegister([...registers, registerService]);
    setService('');
    setLogin('');
    setPassword('');
    setUrl('');
    setButtonEnable(false);
    setShowPassword(false);
  };

  const validPassword = password.length >= 8
    && password.length <= 16
    && /[a-zA-z]+/.test(password)
    && /\d/.test(password)
    && /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  const handleRemoveRegister = (index: number) => {
    const registersAtt = registers.filter((_, registerRmv) => registerRmv !== index);
    setRegister(registersAtt);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {!buttonEnable ? (
        <button type="button" onClick={ handleEnableForm }>Cadastrar nova senha</button>
      ) : (
        <form onSubmit={ handleSubmitForm }>
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
              type={ showPassword ? 'password' : 'text' }
              name="Senha"
              id="Senha"
              minLength={ 8 }
              maxLength={ 16 }
              value={ password }
              onChange={ (event) => {
                setPassword(event.target.value);
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
            disabled={ !validPassword || !service || !login }
          >
            Cadastrar
          </button>
          <button type="button" onClick={ handleEnableForm }>Cancelar</button>

          <label htmlFor="Esconder">Esconder senhas</label>
          <input
            type="checkbox"
            name="Esconder"
            id="Esconder"
            checked={ showPassword }
            onChange={ handleShowPassword }
          />
        </form>
      )}
      {registers.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        <div>
          {registers.map((register, index) => (
            <li key={ index }>
              <a href={ register.url }>{register.service}</a>
              <p>
                Login:
                { register.login }
              </p>
              <p>
                Senha:
                { showPassword ? '******' : register.password}
              </p>

              <button
                type="button"
                data-testid="remove-btn"
                onClick={ () => handleRemoveRegister(index) }
              >
                Remover cadastro
              </button>
            </li>
          ))}
          <label htmlFor="Esconder">Esconder senhas</label>
          <input
            type="checkbox"
            name="Esconder"
            id="Esconder"
            checked={ showPassword }
            onChange={ handleShowPassword }
          />
        </div>
      )}
    </div>
  );
}

export default Form;
