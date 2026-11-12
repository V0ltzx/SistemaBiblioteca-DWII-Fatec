import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TelaBusca.css'
import CardLivro from '../components/CardLivro'
import { BuscaContext } from '../components/TelaLateral' /*Importando o que já existe na tela lateral */

export default function TelaBusca(){

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const [livros, setLivros] = useState([]);
    const { busca } = useContext(BuscaContext)

    const livroFiltrado = livros.filter((livro) => { /*Variável que vai filtrar os livros */
        return livro.titulo.toLowerCase().includes(busca.toLowerCase())
    });

    useEffect(() => {

        async function BuscarLivros() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/livros`, {
                headers: { 'Authorization': `Bearer ${token}`, }
            });
            const dados = await res.json();
            setLivros(dados.data ?? dados);

        }
        BuscarLivros();

    }, []);


    return (
        <div className='tela'>
            <h1 className='titulo'>Biblioteca</h1>
            <p className='titulo-menor'>Texto futuro aqui</p>
            
            {livroFiltrado.map((livros) => (
                    
                    <CardLivro  key={livros.livro_id} livros = {livros}/>
                ))}
            

            
        </div>
        
        
    )
}