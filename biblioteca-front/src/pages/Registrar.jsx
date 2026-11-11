import '../styles/Auth.css'
import Logo from '../assets/Images/Logo.svg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from "../contexts/AuthContext";

export default function Registrar(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { registrar } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro(null);
        setCarregando(true);
        try {
            await registrar(nome, email, senha);
            navigate("/livros");
        } catch (err) {
            setErro("E-mail ou senha inválidos.");
        } finally {
            setCarregando(false);
        }
    }

    return(
        <div className='auth-grid'>
            <div className='auth-grid__fundo'>
                <div className='fundo__text-grande'>
                    <h1 >Seu espaço para novas histórias.</h1>
                </div>
                <div className='fundo__text-pequeno'>
                    <p >Uma leitura de cada vez.</p>
                </div>
            </div>

            <div className='auth-grid__form'>
                <div className='form__topo'>
                    <img className="form__logo" src={Logo}/>

                    <div className='form__text-grande'>
                        <h1>Crie sua conta</h1>
                    </div>

                    <div className='form__text-pequeno'>
                        <p>Seu espaço para descobrir e guardar novas leituras.</p>
                    </div>
                </div>


                <div className='form'>
                   <form onSubmit={handleSubmit}>
                        <div className='form__campo'>
                            <label htmlFor="nome">Nome</label>
                            <div className='form__input'>
                                <input  
                                    type="text" 
                                    name="nome" 
                                    id="nome"
                                    value={nome} 
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite seu nome"
                                    required
                                />
                            </div>
                        </div>

                        <div className='form__campo'>
                            <label htmlFor="email">E-mail</label>
                            <div className='form__input'>
                                <input  
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seuemail@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className='form__campo'>
                            <label htmlFor="senha">Senha</label>
                            <div className='form__input'>
                                <input  
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha" 
                                    id="senha"
                                    value={senha} 
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="Digite sua senha"
                                    required
                                />
                                <button 
                                    type="button"
                                    className='form__input-icon' 
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    {showPassword ? (<Eye />) : (<EyeOff />)} 
                                </button>
                            </div>
                        </div>  

                        <button type='submit' className='btn btn-auth btn--primaria btn--block'>
                            {carregando ? 'Criando conta...' : 'Criar conta'}
                        </button>
                   </form>

                   <button className='btn-other' onClick={() => navigate('/login')}>
                        Já possui uma conta? Entrar
                   </button>
                </div>
            </div>
        </div>
    )
}