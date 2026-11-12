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

    function abrirLivro(livro_id){
        api.get(`/livros/${livro_id}`)
           .then((res) => setDetalhe(res.data))
           .catch(() => (console.log("Não foi possível emprestar o livro")))
           .finally(() => setModalAberto(true));
    }

    return(
        <div>
            <div className='biblioteca-topo'>
                <p className='eyebrow'>ACERVO DE LIVROS</p>
                <div className='titulo-flex'>
                    <h1 className='titulo'>{busca ? 'Resultados da pesquisa' : 'Veja os livros da nossa biblioteca'}</h1>

                    {usuario?.perfil === 'bibliotecario' && (
                        <button type='button' className='topo__btn' onClick={() => setAdicionarModal(true)}>
                            <Plus />
                        </button>
                    )}

                </div>

                <p className='subtexto'>{busca ? `${livros.length} resultados para a pesquisa: "${busca}"` : `Possuímos ${livros.length} livros no nosso catálogo.`}</p>
            </div>
    

            {carregando ? (<center><br /><div className="loader"></div></center>) 
            : (
                <ul>
                    {livros.map((livro) => (
                        <ItemLivro 
                            key={livro.livro_id}
                            livro={livro}
                            onAbrir={() => abrirLivro(livro.livro_id)}
                        />
                    ))}
                </ul>
            )}
            
            {adicionarModal && ( <AdicionarLivro onFechar={() => setAdicionarModal(false)} onSalvar={() => buscarLivros()}/>)}
            {modalAberto && detalhe && ( <DetalheLivro livro={detalhe} onFechar={() => setModalAberto(false)} onExcluir={() => buscarLivros()} onEmprestar={() => abrirLivro(detalhe.livro_id)}/> )}
        </div>        
    )
}