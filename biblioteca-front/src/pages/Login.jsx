import '../styles/Auth.css'
import Logo from '../assets/Images/Logo.svg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro(null);
        setCarregando(true);
        try {
            await login(email, password);
            navigate("/home");
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
                    <button onClick={() => navigate('/home')}>
                        <ArrowLeft />Vá até a página home 
                    </button>

                    <img className="form__logo" src={Logo}/>

                    <div className='form__text-grande'>
                        <h1>Bem-vindo de volta</h1>
                    </div>

                    <div className='form__text-pequeno'>
                        <p>Entre na sua conta e continue explorando o ReadSune.</p>
                    </div>
                </div>


                <div className='form'>
                   <form onSubmit={handleSubmit}>
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
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
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
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </button>
                   </form>

                   <button className='btn-other' onClick={() => navigate('/registrar')}>
                        Ainda não possui conta? Criar conta
                   </button>
                </div>
            </div>
        </div>
    )
}