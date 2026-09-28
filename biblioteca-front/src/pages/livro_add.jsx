import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

function LivroAdd() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    async function Enviar() {

        const obj = {
            titulo,
            isbn,
            genero: genero || null,
            ano_publicacao: ano_pub ? Number(ano_pub) : null,
            autor_id: Number(id_autor),
            capa: capa || null,
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/livros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(obj),
            });
            const data = await res.json();

            if (!res.ok) {
                alert(data.message ?? 'Não foi possível registrar o livro.');
                return;
            }

            alert(data.message ?? 'Livro registrado com sucesso!');

            setTitulo('');
            setIsbn('');
            setGenero('');
            setAno_pub('');
            setId_autor('');
            setCapa('');
        }
        catch (err) {
            alert('Erro de conexão com o servidor.');
        }
    }

    const [titulo, setTitulo] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genero, setGenero] = useState('');
    const [ano_pub, setAno_pub] = useState('');
    const [id_autor, setId_autor] = useState('');
    const [capa, setCapa] = useState('');


    return (
        <>
            <div id="center" className="Textbox">
                <p>Titulo</p>
                <input type="text" value={ titulo } onChange={ (e) => setTitulo(e.target.value) } required />

                <p>ISBN</p>
                <input type="text" value={ isbn } onChange={ (e) => setIsbn(e.target.value) } required />

                <p>Gênero</p>
                <input type="text" value={ genero } onChange={ (e) => setGenero(e.target.value) } />

                <p>Capa</p>
                <input type="text" value={ capa } onChange={ (e) => setCapa(e.target.value) } />

                <p>Ano Publicação</p>
                <input type="number" value={ ano_pub } onChange={ (e) => setAno_pub(e.target.value) } />

                <p>Autor Id</p>
                <input type="number" value={ id_autor } onChange={ (e) => setId_autor(e.target.value) } required />


            </div>

            <div id="center">
                <button className="counter" onClick={ () => Enviar(titulo, isbn, genero, ano_pub, id_autor, capa) }>
                    Enviar
                </button>
            </div>

            <div id="lado">

                <button className="counter" onClick={ () => navigate('/livros') }>
                    Busca
                </button>

                <button className="counter" onClick={ () => navigate('/') } >
                    Login
                </button>

            </div>

        </>
    )
}
export default LivroAdd