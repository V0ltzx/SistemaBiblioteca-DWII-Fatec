import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import interrogacao from '../assets/interrogacao.jpg'
import '../App.css'


function Livros() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [busca, setBusca] = useState('');
    const [livros, setLivros] = useState([]);

    useEffect(() => {

        async function BuscarLivros() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/livros?busca=${busca}`, {
                headers: { 'Authorization': `Bearer ${token}`, }
            });
            const dados = await res.json();
            setLivros(dados.data ?? dados);

        }
        BuscarLivros();

    }, [busca]);


    function Logout() {
        const res = fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });

        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <h1>LIVROS</h1>
            <div id="center">

                <div className="Textbox">
                    <p>Busca</p>
                    <input type="text" value={ busca } onChange={ (e) => setBusca(e.target.value) } required />

                    <ul >
                        { livros.map((livro) => (
                            <li
                                key={ livro.livro_id }

                            >

                                { livro.capa ? (
                                    <img
                                        src={ livro.capa }
                                        width="30%" height="30%"
                                    />
                                ) : (
                                    <img
                                        src={ interrogacao }
                                        width="30%" height="30%"
                                    />
                                ) }
                                <div>
                                    <h2>{ livro.titulo }</h2>
                                    <p>{ livro.autor?.nome ?? 'Autor desconhecido' }</p>
                                    { livro.genero && (
                                        <span>
                                            { livro.genero }
                                        </span>
                                    ) }

                                </div>
                                <br /><br />
                            </li>

                        )) }

                    </ul>
                </div>

                <button className="counter" onClick={ () => Logout() }>
                    Logout
                </button>

            </div>

            <div id="lado">

                <button className="counter" onClick={ () => navigate('/') }>
                    Login
                </button>

                <button className="counter" onClick={ () => navigate('/livro_add') }>
                    Registrar Livros
                </button>

            </div>

        </>
    )
}

export default Livros