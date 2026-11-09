import { useState } from 'react'
import '../styles/AdicionarLivro.css'
import { X, CalendarDays, Link } from 'lucide-react'
import '../styles/Auth.css'
import capaIndefinida from '../assets/Images/capaIndefinida.png'

export default function AdicionarLivro({onFechar}){

    const [form, setForm] = useState({})

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <div className="modal-overlay" onClick={onFechar}>
            <div 
                className="tela-adicionar"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='tela-adicionar__topo'>
                    <h1>
                        Adicionar livro
                    </h1>
                    <button className='tela-adicionar__botao' onClick={onFechar}>
                        <X />
                    </button>
                </div>

                <div className='adicionar-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form__dados'>
                            <div className='form__campo'>
                                <label htmlFor="isbn">ISBN</label>
                                <div className='form__input'>
                                    <input  
                                        type="text" 
                                        name="isbn" 
                                        id="isbn"
                                        value={form.isbn} 
                                        onChange={(e) => setForm(e.target.value)}
                                        placeholder="Digite o ISBN do livro"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='divisoria'>
                                <div className='form__campo'>
                                    <label htmlFor="titulo">Título</label>
                                    <div className='form__input'>
                                        <input  
                                            type="text" 
                                            name="titulo" 
                                            id="titulo"
                                            value={form.titulo} 
                                            onChange={(e) => setForm(e.target.value)}
                                            placeholder="Digite o título do livro"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='form__campo'>
                                    <label htmlFor="autor">Autor</label>
                                    <div className='form__input'>
                                        <input  
                                            type="text" 
                                            name="autor" 
                                            id="autor"
                                            value={form.autor} 
                                            onChange={(e) => setForm(e.target.value)}
                                            placeholder="Digite o nome do autor"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='divisoria'>
                                <div className='form__campo'>
                                    <label htmlFor="genero">Gênero</label>
                                    <div className='form__input'>
                                        <input  
                                            type="text" 
                                            name="genero" 
                                            id="genero"
                                            value={form.genero} 
                                            onChange={(e) => setForm(e.target.value)}
                                            placeholder="Digite o gênero do livro"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='form__campo'>
                                    <label htmlFor="ano_publicacao">Ano de publicação</label>
                                    <div className='form__input'>
                                        <input  
                                            type="text" 
                                            name="ano_publicacao" 
                                            id="ano_publicacao"
                                            value={form.ano_publicacao} 
                                            onChange={(e) => setForm(e.target.value)}
                                            placeholder="Digite o ano"
                                            required
                                        />
                                        <CalendarDays color='#60747B'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className='form__capa'>
                        <h1>Capa do livro</h1>

                        {form.capa ? (
                            <img src={form.capa} />
                        ) : (
                            <img src={capaIndefinida}/>
                        )}
                        
                        <div className='form__campo'>
                                    <label htmlFor="capa">URL da capa</label>
                                    <div className='form__input'>
                                        <input  
                                            type="text" 
                                            name="capa" 
                                            id="capa"
                                            value={form.capa} 
                                            onChange={(e) => setForm(e.target.value)}
                                            placeholder="https://..."
                                        />
                                        <Link color='#60747B'/>
                                    </div>
                                </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}