import '../styles/LivroDetalhe.css'
import { X, BookOpen } from 'lucide-react'
import capaIndefinida from '../assets/Images/capaIndefinida.png'

export default function DetalheLivro({livro, onFechar}){
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
                        {livro.capa ? (<img src={livro.capa} alt="Capa do livro" />) : (<img src={capaIndefinida} alt="Capa do livro" />)}
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
                                {livro.ano_publicacao ? (<h1>{livro.ano_publicacao}</h1>) : (<h1>Este livro não tem data de publicação definida</h1>)}
                            </div>

                            <div className='metadados-genero'>
                                <p className='conteudo__info-mutado'>GÊNERO</p>
                                {livro.genero ? (<h1>{livro.genero}</h1>) : (<h1>Este livro não tem gênero definido</h1>)}
                            </div>
                        </div>

                        <hr className='hr'/>

                        <div className=''>
                            <h1>Sinopse</h1>
                            {livro.sinopse ? (
                                <p className='conteudo__info-mutado'>{livro.sinopse}</p>
                            ) : (
                                <p className='conteudo__info-mutado'>Este livro não possui sinopse</p>
                            )}
                        </div>

                    </div>
                </div>

                <div className='tela-info__botoes'>
                    <hr className='hr'/>
                    <button className='btn btn--block btn--primaria emprestar'>
                        <BookOpen /> Emprestar
                    </button>
                </div>
            </div>
        </div>
    )
}