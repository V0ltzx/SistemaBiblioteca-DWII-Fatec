import '../styles/Biblioteca.css'
import { useContext, useState, useEffect } from 'react'
import { BuscaContext } from '../components/TelaLateral'
import api from '../api/client'
import ItemLivro from '../components/ItemLivro'
import DetalheLivro from '../components/DetalheLivro'
import AdicionarLivro from '../components/AdicionarLivro'
import { Plus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext';

export default function Biblioteca(){
    const { busca } = useContext(BuscaContext);
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [adicionarModal, setAdicionarModal] = useState(false);
    const [detalhe, setDetalhe] = useState(null);
    const { usuario } = useAuth();

    useEffect(() => {
        buscarLivros();
    }, [busca]);

    function buscarLivros(){
        api.get("/livros", {params: {busca} })
           .then((res) => setLivros(res.data.data))
           .finally(() => setCarregando(false));
    }

    function abrirLivro(livro){
        setDetalhe(livro);
        setModalAberto(true);
    }

    return(
        <div>
            
            {busca ? (
                <div className='biblioteca-topo'>
                    <div className='titulo-flex'>
                        <h1 className='titulo'>Resultados da pesquisa</h1>
                        {usuario.perfil === 'bibliotecario' && (
                            <button type='button' className='topo__btn' onClick={() => setAdicionarModal(true)}>
                                <Plus />
                            </button>
                        )}
                    </div>
                    <p className='subtexto'>{livros.length} resultados para a pesquisa: "{busca}"</p>
                </div>
            ) : (
                <div className='biblioteca-topo'>
                    <div className='titulo-flex'>
                        <h1 className='titulo'>Veja os livros da nossa biblioteca!</h1>
                        {usuario?.perfil === 'bibliotecario' && (
                            <button type='button' className='topo__btn' onClick={() => setAdicionarModal(true)}>
                                <Plus />
                            </button>
                        )}
                    </div>
                    <p className='subtexto'>Possuímos {livros.length} livros no nosso catálogo. </p>
                </div>       
            )}
            
            <br /><hr className='hr'/><br />

            {carregando ? (<p>Carregando...</p>) 
            : (
                <ul>
                    {livros.map((livro) => (
                        <ItemLivro 
                            key={livro.livro_id}
                            livro={livro}
                            onAbrir={() => abrirLivro(livro)}
                        />
                    ))}
                </ul>
            )}
            
            {adicionarModal && ( <AdicionarLivro onFechar={() => setAdicionarModal(false)}/>)}
            {modalAberto && detalhe && ( <DetalheLivro livro={detalhe} onFechar={() => setModalAberto(false)} /> )}
        </div>        
    )
}