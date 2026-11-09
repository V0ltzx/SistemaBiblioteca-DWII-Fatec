import '../styles/TelaLateral.css'
import { LibraryBig, BookCopy, Search, ChevronRight } from 'lucide-react'
import Logo from '../assets/Images/Logo.svg'
import { useState, createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '../assets/Images/Avatar.png'

const BuscaContext = createContext();

export default function TelaLateral({children}){
    const [ativo, setAtivo] = useState("livros");
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function handleBuscaChange(e) {
        setBusca(e.target.value);
        if (location.pathname !== "/livros") {
            navigate("/livros");
        }
    }

    function Navegar(rota){
        setAtivo(rota);
        navigate("/" + rota);
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

                        <button className={`btn ${location.pathname === "/livros" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/livros")}>
                            <LibraryBig /> Biblioteca
                        </button>

                        <button className={`btn ${location.pathname === "/emprestimos" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => navigate("/emprestimos")}>
                            <BookCopy /> Empréstimos
                        </button>

                        <button className={`btn ${location.pathname === "perfil" ? "btn__ativo" : "btn__inativo"} btn-perfil btn--block `} onClick={() => navigate("/login")}>
                                <div className='btn-perfil__avatar' >
                                    <img src={Avatar} />
                                </div>
                                (Implementar usuario)
                            <ChevronRight className='btn-perfil__icon'/>
                        </button>
                    </div>
                </div>

                <div className='tela-grid__paginas'>
                    {children}
                </div>
            </div>
        </BuscaContext.Provider>
    )
}