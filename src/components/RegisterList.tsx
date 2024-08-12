import React from 'react';
import trashImg from '../images/trash-img.svg';

type NewRegister = {
  service: string;
  login: string;
  password: string;
  url: string;
};

type RegisterListProps = {
  registers: NewRegister[];
  showPassword: boolean;
  handleRemoveRegister: (index: number) => void;
  handleShowPassword: () => void;
};

function RegisterList({
  registers,
  showPassword,
  handleRemoveRegister,
  handleShowPassword,
}: RegisterListProps) {
  return (
    <div className="bg-stone-200 flex items-center justify-center">
      {registers.length === 0 ? (
        <p
          className="bg-white px-5 py-2
          rounded-xl shadow-lg flex flex-col gap-4 w-96 text-center justify-center"
        >
          Nenhuma senha cadastrada
        </p>
      ) : (
        <div
          className="bg-white text-whitepx-5 py-2 rounded-xl
          shadow-lg flex flex-col gap-4 w-96 text-center justify-center"
        >
          {registers.map((register, index) => (
            <li key={ index } className="flex justify-between items-center">
              <a
                href={ register.url }
                className="text-blue-500"
              >
                {register.service}
              </a>
              <p>
                Login:
                {' '}
                {register.login}
              </p>
              <p>
                Senha:
                {' '}
                {showPassword ? register.password : '******'}
              </p>
              <button
                type="button"
                data-testid="remove-btn"
                onClick={ () => handleRemoveRegister(index) }
                className="bg-red-500 text-white p-2 rounded-lg shadow"
                aria-label="Remover registro"
              >
                <img src={ trashImg } alt="Remover" />
              </button>
            </li>
          ))}
          <div className="flex justify-between items-center mt-4">
            <input
              type="checkbox"
              name="Esconder"
              id="Esconder"
              checked={ showPassword }
              onChange={ handleShowPassword }
              className="accent-black text-sm"
            />
            <label htmlFor="Esconder" className="text-sm">
              Mostrar senha
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterList;
