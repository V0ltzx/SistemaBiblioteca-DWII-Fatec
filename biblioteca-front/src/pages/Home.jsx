import '../styles/Home.css';
import { BookOpen, Search, Bookmark, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom'

export default function Home(){
    const { usuario } = useAuth();
    const Navigate = useNavigate()

    return(
        <div>
            <div className='home__topo'>
                <p className='eyebrow'>SUA BIBLIOTECA DIGITAL</p>
                <h1>Bem-vindo ao Readsune</h1>
            </div>

            <div className='home__conteudo'>
                <div className='home__conteudo-icone'>
                    <BookOpen size={64} strokeWidth={1}/>
                </div>

                <div className='home__conteudo-info'>
                    <h1>Sua próxima leitura começa aqui</h1>
                    <p>Use a busca para encontrar um título, e empreste livros que você tenha interesse.</p>
                </div>

                <div className='home__conteudo-botoes'>
                    <button className='home__conteudo-botoes' onClick={() => Navigate('/livros')}>
                        <Search /><p>Busque uma leitura </p> 
                    </button>
                    

                    <p className='separador'>|</p>

                    <button  onClick={usuario ? () => Navigate('/emprestimos') : () => Navigate('/login') }>
                        {usuario ? (
                            <div className='home__conteudo-botoes'>
                                <Bookmark />
                                <p>Veja seus empréstimos</p>
                            </div>
                        ) : (
                            <div className='home__conteudo-botoes'>
                                <LogIn />
                                <p>Entre ou se registre</p>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}