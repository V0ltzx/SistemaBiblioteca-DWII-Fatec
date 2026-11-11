import '../styles/LivroDetalhe.css';
import { X, BookOpen } from 'lucide-react';
import capaIndefinida from '../assets/Images/capaIndefinida.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DetalheLivro({livro, onFechar}){
    const { usuario } = useAuth();
    const Navigate = useNavigate()

    async function emprestar(){
        console.log("Tentou emprestar")
    }

    return(
        <div className='modal-overlay' onClick={onFechar}>
            <div 
                className='tela-info' 
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-livro-title"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='tela-info__topo'>
                    <p>DETALHES DO LIVRO</p>
                    <button className='topo__botao' onClick={onFechar}>
                        <X />
                    </button>
                </div>

                <div className='tela-info__conteudo'>
                    <div className='conteudo__capa'>
                        <img src={livro.capa ? `${livro.capa}` : `${capaIndefinida}`} alt="capa do livro" />
                    </div>

                    <div className='conteudo__info'>
                        <div>
                            <h1 className='conteudo__info-titulo'>
                                {livro.titulo}
                            </h1>
                            <p className='conteudo__info-mutado'> 
                               de {livro.autor.nome}
                            </p>
                        </div>

                        <div className='conteudo__info-metadados'>
                            <div className='metadados-data'>
                                <p className='conteudo__info-mutado'>ANO DE PUBLICAÇÃO</p>
                                <h1>{livro.ano_publicacao ? `${livro.ano_publicacao}` : 'Este livro não tem data de publicação definida'}</h1>
                            </div>

                            <div className='metadados-genero'>
                                <p className='conteudo__info-mutado'>GÊNERO</p>
                                <h1>{livro.genero ? `${livro.genero}` : 'Este livro não tem gênero definido'}</h1>
                            </div>
                        </div>

                        <hr className='hr'/>

                        <div className=''>
                            <h1>Sinopse</h1>
                            <p className='conteudo__info-mutado'>{livro.sinopse ? `${livro.sinopse}` : 'Este livro não possui sinopse'}</p>
                        </div>

                    </div>
                </div>
                
                <div className='tela-info__botoes'>
                    <hr className='hr'/>
                    <button className='btn btn--block btn--primaria emprestar' onClick={usuario ? () => emprestar() : () => Navigate('/login')}>
                        <BookOpen /> Emprestar
                    </button>
                </div>
            </div>
        </div>
    )
}