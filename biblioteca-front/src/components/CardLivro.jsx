import { useContext } from 'react'
import '../styles/CardLivro.css'
import { ArrowRight } from 'lucide-react'

export default function CardLivro( {livros} ){

    return (
        
        <div className='card'>
            <div  className='capa'>
                <img src={livros.capa}  className='imagem'/>
            </div>
            
            <div className='info-livro'>
                
                <h1 className='titulo-card'>{ livros.titulo}</h1>
                <p className='titulo-menor-card'>ISBN: {livros.isbn}</p>

                <div className='card-detalhes'>
                    <a href="" >Ver Detalhes</a> 
                    <ArrowRight/>
                </div>
                
            </div>

            
            
            
        </div>
    )
}