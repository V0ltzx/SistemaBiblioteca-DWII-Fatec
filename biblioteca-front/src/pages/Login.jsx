import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');

  async function Entrar(password, email) {

    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);


    localStorage.setItem('token', data.token);

    navigate('/livros');

  }



  async function Registrar(nome, senha, email) {

    const res = await fetch(`${import.meta.env.VITE_API_URL}/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });
    const data = await res.json();
    alert(data.message);


    localStorage.setItem('token', data.token);

    navigate('/livros');

  }



  async function Logout() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    alert(data.message);
    localStorage.removeItem('token');
  }

  return (
    <>

      <div id="center">
        <div>
          <h3>Registro</h3>
        </div>

        <div className="Textbox">

          <p>Nome:</p>
          <input type="text" value={ nome }
            onChange={ (e) => setNome(e.target.value) } required />

          <p>Email</p>
          <input type="email" value={ email1 }
            onChange={ (e) => setEmail1(e.target.value) } required />
          <p>Senha</p>
          <input type="password" value={ password1 }
            onChange={ (e) => setPassword1(e.target.value) } required />

        </div>

        <button className="counter" onClick={ () => Registrar(nome, password1, email1) }>
          Registro
        </button>

      </div>

      <section id="barra"></section>


      <div id="center">
        <div>
          <h3>Login</h3>
        </div>

        <div className="Textbox">
          <p>Email</p>
          <input type="email" value={ email }
            onChange={ (e) => setEmail(e.target.value) } required />
          <p>Senha</p>
          <input type="password" value={ password }
            onChange={ (e) => setPassword(e.target.value) } required />

        </div>

        <button className="counter" onClick={ () => Entrar(password, email) }>
          Login
        </button>

        <button className="counter" onClick={ () => Logout() }>
          Logout
        </button>

      </div>

      <div id="lado">

        <button className="counter" onClick={ () => navigate('/livros') }>
          Busca
        </button>


        <button className="counter" onClick={ () => navigate('/livro_add') }>
          Resgistar Livros
        </button>

      </div>
    </>
  )
}

export default Login
