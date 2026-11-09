import '../styles/TelaLateral.css'
import { LibraryBig, BookCopy, Search, ChevronRight, House } from 'lucide-react'
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
        navigate("/livros");
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

                        <button className={`btn ${location.pathname === "/livrosold" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/livrosold")}>
                            <House /> Home
                        </button>

                        <button className={`btn ${location.pathname === "/livros" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/livros")}>
                            <LibraryBig /> Biblioteca
                        </button>

                        <button className={`btn ${location.pathname === "/emprestimos" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/emprestimos")}>
                            <BookCopy /> Empréstimos
                        </button>

                        {usuario ? (
                            <button className={`btn ${location.pathname === "/perfil" ? "btn__ativo" : "btn__inativo"} btn-perfil btn--block `} onClick={() => deslogar()}>
                                <div className='btn-perfil__avatar' >
                                    <img src={Avatar} />
                                </div>
                                    Sair da conta
                                <ChevronRight className='btn-perfil__icon'/>
                            </button>
                        ) : (
                            <button className={`btn ${location.pathname === "/perfil" ? "btn__ativo" : "btn__inativo"} btn-perfil btn--block `} onClick={() => navigate("/login")}>
                                Entrar
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