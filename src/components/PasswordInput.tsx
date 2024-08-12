import React from 'react';
import eyeOpen from '../images/eye-open.svg';
import eyeClosed from '../images/eye-closed.svg';

type PasswordInputProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleShowPassword: () => void;
};

function PasswordInput({
  password,
  setPassword,
  showPassword,
  handleShowPassword,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <input
        placeholder="Senha"
        type={ showPassword ? 'text' : 'password' }
        name="Senha"
        id="Senha"
        minLength={ 8 }
        maxLength={ 16 }
        value={ password }
        onChange={ (event) => setPassword(event.target.value) }
        className="w-full text-center bg-black text-white p-2 rounded-lg m-1"
      />
      <button
        type="button"
        onClick={ handleShowPassword }
        className="absolute right-3
        top-1/2 transform -translate-y-1/2 cursor-pointer bg-transparent border-none"
        aria-label={ showPassword ? 'Ocultar senha' : 'Mostrar senha' }
      >
        <img
          src={ showPassword ? eyeOpen : eyeClosed }
          alt={ showPassword ? 'Ocultar senha' : 'Mostrar senha' }
        />
      </button>
    </div>
  );
}

export default PasswordInput;
