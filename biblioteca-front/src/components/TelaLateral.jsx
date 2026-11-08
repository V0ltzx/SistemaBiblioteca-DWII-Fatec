import '../styles/TelaLateral.css'
import { LibraryBig, BookCopy, Search, ChevronRight, House } from 'lucide-react'
import Logo from '../assets/Images/Logo.svg'
import { useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '../assets/Images/Avatar.png'

export const BuscaContext = createContext();

export default function TelaLateral({children}){
    const [ativo, setAtivo] = useState("home");
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();

    function Navegar(rota){
        setAtivo(rota);
        navigate("/" + rota);
    }

    function Biblioteca(value){
        setBusca(value);
        setAtivo("livros");
        navigate("/livros");
    }

    return(
<<<<<<< Updated upstream
        <div className='tela-grid'>
            <div className='tela-grid__lateral'>
                
                <div className='tela-lateral__logo'>
                    <img src={Logo} alt="Logo" />
=======
        <BuscaContext.Provider value={{busca, setBusca}}>
            <div className='tela-grid'>
                <div className='tela-grid__lateral'>
                    <div className='lateral-content'>
                        <div className='tela-lateral__logo'>
                            <img src={Logo} alt="Logo" />
                        </div>

                        <div className='barra-pesquisa'>
                            <Search className='barra-pesquisa__icon' />
                            <input className='barra-pesquisa__input' type="search" placeholder='Busque por ISBN ou titulo' value={busca} onChange={(e) => Biblioteca(e.target.value)}></input>
                        </div>

                        <button className={`btn ${ativo === "home" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => Navegar("livrosold")}>
                            <House /> Home
                        </button>

                        <button className={`btn ${ativo === "livros" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => Navegar("livros")}>
                            <LibraryBig /> Biblioteca
                        </button>

                        <button className={`btn ${ativo === "emprestimos" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => Navegar("emprestimos")}>
                            <BookCopy /> Empréstimos
                        </button>

                        <button className={`btn ${ativo === "perfil" ? "btn__ativo" : "btn__inativo"} btn-perfil btn--block `} onClick={() => Navegar("perfil")}>
                                <div className='btn-perfil__avatar' >
                                    <img src={Avatar} />
                                </div>
                                Meu perfil
                            <ChevronRight className='btn-perfil__icon'/>
                        </button>
                    </div>
                </div>

                <div className='tela-grid__paginas'>
                    {children}
>>>>>>> Stashed changes
                </div>
                

                <div className='barra-pesquisa'>
                    <Search className='barra-pesquisa__icon' />
                    <input className='barra-pesquisa__input' type="search" placeholder='Busque por ISBN ou titulo' value={busca} onChange={(e) => setBusca(e.target.value)}></input>
                </div>

                <button className={`btn ${ativo === "livros" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => Navegar("livros")}>
                    <LibraryBig /> Biblioteca
                </button>

                <button className={`btn ${ativo === "emprestimos" ? "btn__ativo" : "btn__inativo"} btn--block`} onClick={() => Navegar("emprestimos")}>
                    <BookCopy /> Empréstimos
                </button>

                <button className={`btn ${ativo === "perfil" ? "btn__ativo" : "btn__inativo"} btn--block btn-perfil`} onClick={() => Navegar("perfil")}>
                        <div className='btn-perfil__avatar' >
                            <img src={Avatar} />
                        </div>
                        Meu perfil
                    <ChevronRight className='btn-perfil__icon'/>
                </button>
            </div>
        </BuscaContext.Provider>   
    )
}