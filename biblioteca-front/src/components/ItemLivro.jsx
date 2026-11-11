import '../styles/ItemLivro.css';
import CapaIndefinida from '../assets/Images/capaIndefinida.png';
import { ArrowRight } from 'lucide-react';

export default function ItemLivro({livro, onAbrir}){
    return(
        <div className='container-livro'>
            <div className='container-livro__capa'>
                <img src={livro.capa ? `${livro.capa}` : `${CapaIndefinida}`} alt="capa do livro" />
            </div>

            <div className='container-livro__info'>
                <div className='livro-titulo'>
                    <p>{livro.titulo ? `${livro.titulo}` : 'Título do livro'}</p>
                </div>

                <div className='livro-isbn'>
                    <p>{livro.isbn ? `ISBN: ${livro.isbn}` : 'ISBN: não informado'}</p>
                </div>
                
                <button className='livro-botao' onClick={onAbrir}>
                    Ver detalhes <ArrowRight />
                </button>

            </div>
        </div>
    )
}