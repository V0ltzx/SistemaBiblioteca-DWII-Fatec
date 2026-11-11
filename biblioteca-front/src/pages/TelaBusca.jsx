import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TelaBusca.css'
import CardLivro from '../components/CardLivro'

export default function TelaBusca(){
const navigate = useNavigate();

const token = localStorage.getItem('token');
const [livros, setLivros] = useState([]);

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
            
            {livros.map((livros) => (
                    
                    <CardLivro livros = {livros}/>
                ))}
            

            
        </div>
        
        
    )
}