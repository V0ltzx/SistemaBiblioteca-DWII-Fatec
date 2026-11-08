import '../styles/Biblioteca.css'
import { useContext, useState, useEffect } from 'react'
import { BuscaContext } from '../components/TelaLateral'
import api from '../api/client'
import ItemLivro from '../components/ItemLivro'
import DetalheLivro from '../components/DetalheLivro'

export default function Biblioteca(){
    const { busca } = useContext(BuscaContext);
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(true);
    const [detalhe, setDetalhe] = useState(null);

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
                <div>
                    <h1 className='titulo'>Resultados da pesquisa</h1>
                    <p className='subtexto'>{livros.length} resultados para a pesquisa: "{busca}"</p>
                </div>
            ) : (
                <div>
                    <h1 className='titulo'>Veja os livros de nossa biblioteca!</h1>
                    <p className='subtexto'>Possuímos {livros.length} livros no nosso catálogo. </p>
                </div>       
            )}
            

            <br /><hr /><br />

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

            {modalAberto && detalhe && ( <DetalheLivro livro={detalhe} onFechar={() => setModalAberto(false)} /> )}
        </div>        
    )
}