import '../styles/TelaLateral.css'
import { LibraryBig, BookCopy, Search, ChevronRight, House, Star } from 'lucide-react'
import Logo from '../assets/Images/Logo.svg'
import { useState, createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '../assets/Images/Avatar.png'
import { useAuth } from '../contexts/AuthContext';

export const BuscaContext = createContext();

export default function TelaLateral({children}){
    const [busca, setBusca] = useState("");
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    function handleBuscaChange(e) {
        setBusca(e.target.value);
        if (location.pathname !== "/livros") {
            navigate("/livros");
        }
    }

    async function deslogar(){
        await logout();
        navigate("/home");
    }

    return(
        <BuscaContext.Provider value={{ busca, setBusca}}>
            <div className='tela-grid'>
                <div className='tela-grid__lateral'>
                    <div className='lateral-content'>
                        <div className='tela-lateral__logo'>
                            <img src={Logo} alt="Logo" />
                        </div>

                        <div className='barra-pesquisa'>
                            <Search className='barra-pesquisa__icon' />
                            <input className='barra-pesquisa__input' type="search" placeholder='Busque por ISBN ou titulo' value={busca} onChange={handleBuscaChange}></input>
                        </div>

                        <button className={`btn ${location.pathname === "/home" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/home")}>
                            <House /> Home
                        </button>

                        <button className={`btn ${location.pathname === "/livros" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/livros")}>
                            <LibraryBig /> Biblioteca
                        </button>
                        {usuario && (
                            <button className={`btn ${location.pathname === "/emprestimos" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/emprestimos")}>
                                <BookCopy /> Empréstimos
                            </button>
                        )}
                    
                        {usuario && (
                            <button className={`btn ${location.pathname === "/perfil" ? "btn__ativo" : "btn__inativo"} btn-perfil btn--block `} onClick={() => deslogar()}>
                                <div className='btn-perfil__avatar' >
                                    <img src={Avatar} />
                                </div>

                                <div className='btn-perfil__text'>
                                    <p className='btn-perfil__text-nome'>
                                        {usuario.nome}
                                        {usuario.perfil === 'bibliotecario' && (<Star size={16} fill='#155158'/>)}
                                    </p>
                                    <p>Sair da conta</p>
                                </div>

                                <ChevronRight className='btn-perfil__icon'/>
                            </button>
                        )}

                    </div>
                </div>

                <div className='tela-grid__paginas'>
                    {children}
                </div>
            </div>    
        </BuscaContext.Provider>   
    )
}