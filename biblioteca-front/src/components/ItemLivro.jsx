import '../styles/ItemLivro.css';
import CapaIndefinida from '../assets/Images/CapaIndefinida.png';
import { ArrowRight } from 'lucide-react';

export default function ItemLivro({livro, onAbrir}){
    return(
        <div className='container-livro'>
            <div className='container-livro__capa'>
                {livro.capa ? (<img src={livro.capa}></img>) : ( <img src={CapaIndefinida} ></img> )}
            </div>

            <div className='container-livro__info'>
                <div className='livro-titulo'>
                    {livro.titulo ? (
                        <p>{livro.titulo}</p>
                    )
                    : (
                        <p>Título do livro</p>
                    )}
                </div>

                <div className='livro-isbn'>
                    {livro.isbn ? (
                        <p>ISBN: {livro.isbn}</p>
                    )
                    : (
                        <p>ISBN: Não informado</p>
                    )}
                </div>
                
                    <button className='livro-botao' onClick={onAbrir}>
                        Ver detalhes <ArrowRight />
                    </button>

            </div>
        </div>
    )
}