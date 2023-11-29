import React from 'react';

function Form() {
  return (
    <form action="">
      <div>
        <label htmlFor="Service">Nome do serviço</label>
        <input type="text" name="Service" id="Service" />
      </div>
      <div>
        <label htmlFor="Login">Login</label>
        <input type="text" name="Login" id="Login" />
      </div>
      <div>
        <label htmlFor="Senha">Senha</label>
        <input type="password" name="Senha" id="Senha" />
      </div>
      <div>
        <label htmlFor="URL">URL</label>
        <input type="text" name="URL" id="URL" />
      </div>
      <button>Cadastrar</button>
      <button>Cancelar</button>
    </form>
  );
}

export default Form;
