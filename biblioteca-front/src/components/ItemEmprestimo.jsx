import '../styles/ItemEmprestimo.css';
import capaIndefinida from '../assets/Images/capaIndefinida.png';
import api from '../api/client';
import { useState } from 'react';

export default function ItemEmprestimo({ emprestimo, onDevolver }){
    const [devolvendo, setDevolvendo] = useState(false);

    const diffMs = new Date(emprestimo.data_devolucao) - new Date();
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const atrasado = dias < 0;

    async function devolver(e){
        e.preventDefault();
        setDevolvendo(true);
        try{
            api.patch(`/emprestimos/${emprestimo.emprestimo_id}/devolucao`);
        } catch(err){
            console.log(err?.response?.data?.message ?? "Não foi possível devolver o livro");
        } finally{
            setDevolvendo(false);
            onDevolver();
        }
    }

    return(
        <div className={
                `container-emprestimo 
                ${emprestimo.data_devolvido && 'container-emprestimo__devolvido'}
                ${atrasado && 'container-emprestimo__atrasado'}`
            }>

            <img 
                className='container-emprestimo__capa' 
                src={emprestimo?.livro?.capa ? `${emprestimo.livro.capa}` : `${capaIndefinida}`} 
                alt="capa do livro" 
            />

            <div className='container-emprestimo__info'>
                <h1 className='emprestimo__titulo'>{emprestimo?.livro?.titulo}</h1>

                <div className='emprestimo__data'>
                    <div className='emprestimo__data-emp'>
                        <p>Emprestado em</p>
                        <h1>
                            {new Date(emprestimo.data_emprestimo.replace(/-/g, '/')).toLocaleDateString('pt-BR', { 
                                    day: '2-digit', 
                                    month: 'short',
                                    year: 'numeric'
                                })
                            }
                        </h1>
                    </div>

                    <div className={`emprestimo__data-dev ${atrasado && !emprestimo.data_devolvido && 'emprestimo__data-atrasado'}`}>
                        {emprestimo.status === 'devolvido' && (
                            <div>
                                <p>Devolvido em</p>
                                <h1>
                                    {new Date(emprestimo.data_devolvido.replace(/-/g, '/')).toLocaleDateString('pt-BR', { 
                                            day: '2-digit', 
                                            month: 'short', 
                                            year: 'numeric'
                                        })
                                    }
                                </h1>
                            </div>
                        )}
                        
                        {emprestimo.status === 'emprestado' && (
                            <div>
                                <p>Devolver até</p>
                                <h1>
                                    {new Date(emprestimo.data_devolucao.replace(/-/g, '/')).toLocaleDateString('pt-BR', { 
                                            day: '2-digit', 
                                            month: 'short', 
                                            year: 'numeric'
                                        })
                                    }
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='emprestimo__direita'>
                <div className={`emprestimo__prazo ${!emprestimo.data_devolvido && atrasado ? 'emprestimo__prazo-vermelho' : 'emprestimo__prazo-azul'}`}>
                    <p>
                        {emprestimo.data_devolvido ? (
                            <p>Devolvido</p> 
                        ) : (
                            (`${atrasado && !emprestimo.data_devolvido
                                ? `Fora do prazo · ${Math.abs(dias)} dias` 
                                : `No prazo · ${dias} dias`
                            }`)
                        )}
                        
                    </p>   
                </div>

                <div className='emprestimo__botoes'>
                    {emprestimo.data_devolvido ? (<span className='none'></span>) : (
                        <button type='button' className='btn bt--block btn--primaria' onClick={devolver}>
                            {devolvendo ? 'Devolvendo...' : 'Devolver'}
                        </button>
                    )}
                    
                </div>
            </div>

        </div>
    )
}