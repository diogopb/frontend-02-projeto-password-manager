import React, { useState } from 'react';
import trashImg from '../images/trash-img.svg'; // Importe o ícone de lixeira
import eyeOpenImg from '../images/eye-open.svg'; // Importe o ícone de olho aberto
import eyeClosedImg from '../images/eye-closed.svg'; // Importe o ícone de olho fechado

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

  const validatePasswordLength = () => {
    return password.length >= 8 && password.length <= 16;
  };

  const validatePasswordLettersAndNumbers = () => {
    return /[a-zA-Z]+/.test(password) && /\d/.test(password);
  };

  const validatePasswordSpecialCharacters = () => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validPassword = validatePasswordLength()
    && validatePasswordLettersAndNumbers()
    && validatePasswordSpecialCharacters();

  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  const handleRemoveRegister = (index: number) => {
    const updatedRegisters = registers.filter((_, i) => i !== index);
    setRegister(updatedRegisters);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {!buttonEnable ? (
        <div className="bg-stone-200 min-h-screen flex items-center justify-center">
          <button
            className="bg-black text-white p-2 rounded-lg m-1 w-96 text"
            type="button"
            onClick={ handleEnableForm }
          >
            Register new password
          </button>
        </div>
      ) : (
        <div className="bg-stone-200 min-h-screen flex items-center justify-center">
          <form
            onSubmit={ handleSubmitForm }
            className="bg-white px-10 py-10 rounded-xl shadow-lg flex flex-col gap-4 w-96 text-center justify-center"
          >
            <h1 className="text-2xl font-bold mb-4">Password Manager</h1>

            <fieldset className="relative">
              <div>
                <input
                  placeholder="Service Name"
                  type="text"
                  name="Service"
                  id="Service"
                  value={ service }
                  onChange={ (event) => setService(event.target.value) }
                  className="w-full display-block bg-black text-white p-2 rounded-lg m-1 text-center"
                />
              </div>

              <div>
                <input
                  placeholder="Login"
                  type="text"
                  name="Login"
                  id="Login"
                  value={ login }
                  onChange={ (event) => setLogin(event.target.value) }
                  className="w-full display-block bg-black text-white p-2 rounded-lg m-1 text-center"
                />
              </div>

              <div className="relative">
                <input
                  placeholder="Password"
                  type={ showPassword ? 'text' : 'password' }
                  name="Senha"
                  id="Senha"
                  minLength={ 8 }
                  maxLength={ 16 }
                  value={ password }
                  onChange={ (event) => setPassword(event.target.value) }
                  className="w-full text-center block bg-black text-white p-2 rounded-lg m-1 pr-10"
                />
                <img
                  src={ showPassword ? eyeClosedImg : eyeOpenImg }
                  alt="Toggle Password Visibility"
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={ handleTogglePasswordVisibility }
                />
              </div>
            </fieldset>

            <div>
              <p className={ password.length < 8 ? invalid : valid }>
                Have 8 or more characters
              </p>

              <p className={ password.length <= 16 ? valid : invalid }>
                Have up to 16 characters
              </p>

              <p className={ validatePasswordLettersAndNumbers() ? valid : invalid }>
                Have letters and numbers
              </p>

              <p className={ validatePasswordSpecialCharacters() ? valid : invalid }>
                Have some special character
              </p>
            </div>

            <div className="grid grid-flow-col gap-x-2">
              <input
                type="text"
                name="URL"
                id="URL"
                value={ url }
                placeholder="URL"
                onChange={ (event) => setUrl(event.target.value) }
                className="w-full text-center bg-black text-white p-2 rounded-lg"
              />
            </div>

            <fieldset className="flex justify-between">
              <button
                type="submit"
                disabled={ !validPassword || !service || !login }
                className="w-full display-block bg-green-500 text-white p-2 rounded-lg shadow-2xl"
              >
                Register
              </button>
              <button
                type="button"
                onClick={ handleEnableForm }
                className="w-full display-block bg-red-500 text-white p-2 rounded-lg shadow"
              >
                Cancel
              </button>
            </fieldset>

            <fieldset className="flex justify-between items-center">
              <input
                type="checkbox"
                name="Esconder"
                id="Esconder"
                className="accent-black text-sm"
              />
              <label className="mr-20 text-sm flex items-center" htmlFor="Esconder">
                Remember me
              </label>

              <a href="https://www.google.com" className="text-green-500 text-sm">
                Forgot password?
              </a>
            </fieldset>

          </form>
        </div>
      )}
      {registers.length === 0 ? (
        <div className="bg-stone-200 flex items-center justify-center">
          <p className="bg-white px-5 py-2 rounded-xl shadow-lg flex flex-col gap-4 w-96 text-center justify-center">
            No password registered
          </p>
        </div>
      ) : (
        <div className="bg-stone-200 flex items-center justify-center">
          <div className="bg-black text-white px-5 py-2 rounded-xl shadow-lg flex flex-col gap-4 w-96 text-center justify-center">
            {registers.map((register, index) => (
              <li key={ index }>
                <a href={ register.url }>{register.service}</a>
                <p>
                  Login:
                  {' '}
                  {register.login}
                </p>
                <p>
                  Password:
                  {' '}
                  {showPassword ? '******' : register.password}
                </p>

                <button
                  type="button"
                  data-testid="remove-btn"
                  onClick={ () => handleRemoveRegister(index) }
                >
                  <img src={ trashImg } alt="Remove" />
                  {' '}
                  {/* Utiliza o ícone de lixeira */}
                </button>
              </li>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Form;
