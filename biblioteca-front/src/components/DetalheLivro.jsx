import '../styles/LivroDetalhe.css';
import { X, BookOpen, Ban, Trash } from 'lucide-react';
import capaIndefinida from '../assets/Images/capaIndefinida.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useState } from 'react';

export default function DetalheLivro({livro, onFechar}){
    const { usuario } = useAuth();
    const [emprestando, setEmprestando] = useState(false);
    const [excluindo, setExcluindo] = useState(false);
    const Navigate = useNavigate()

    async function handleEmprestar(e){
        e.preventDefault();
        setEmprestando(true);

        try{
            api.post('/emprestimos', {livro_id: livro.livro_id});
        } catch(err){
            console.log(err?.response?.data?.message ?? "Não foi possível emprestar o livro");
        } finally{
            setEmprestando(false);
        }
    }

    async function handleExcluir(e){
        e.preventDefault()
        setExcluindo(true);

        try{
            api.delete(`/livros/${livro.livro_id}`);
        } catch(err){
            console.log(err?.message ?? "Não foi possível excluir o livro");
        } finally {
            setExcluindo(false);
        }
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
                    <div>
                        {!livro.emprestado ? (
                            <button className='btn btn--block btn--primaria emprestar' onClick={usuario ? handleEmprestar : () => Navigate('/login')}>
                                <BookOpen /> {emprestando ? 'Emprestando...' : 'Emprestar'}
                            </button>
                        ) : (
                            <button className='btn btn--block btn--primaria emprestar indisponivel' disabled>
                                <Ban /> Indisponível
                            </button>
                        )}

                        {usuario?.perfil === 'bibliotecario' && (
                            <button className='btn btn--block btn--primaria emprestar vermelho' onClick={handleExcluir}>
                                <Trash /> {excluindo ? "Excluindo" : "Excluir"}
                            </button>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}