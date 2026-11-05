import '../styles/TelaLateral.css'
import { House } from 'lucide-react'

export default function TelaLateral({children}){
    return(
        <div className='tela-grid'>
            <div className='tela-grid__lateral'>
                <button className='btn btn--primaria btn--block'>
                    <House /> Home
                </button>
            </div>

            <div className='tela-grid__paginas'>
                {children}
            </div>
        </div>
    )
}