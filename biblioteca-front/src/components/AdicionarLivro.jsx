import { useState } from 'react';
import axios from "axios";
import '../styles/AdicionarLivro.css';
import { X, CalendarDays, Link, Search } from 'lucide-react';
import '../styles/Auth.css';
import capaIndefinida from '../assets/Images/capaIndefinida.png';
import { useActionData } from 'react-router-dom';

export default function AdicionarLivro({onFechar}){

    const [form, setForm] = useState({});
    const [buscandoIsbn, setBuscandoIsbn] = useState(true);
    const [carregando, setCarregando] = useState(false);

    async function buscaIsbn(){
        if (!form.isbn) return;

        let livroSinopse = form.sinopse;
        let autorNome = form.autor;
        let livroGenero = form.genero;

        try{
            setCarregando(true);
            const { data: dadosLivro }  = await axios.get(`https://openlibrary.org/isbn/${form.isbn}.json`);
            if( dadosLivro?.authors[0]?.key ){
                try{
                   const { data: dadosAutor } = await axios.get(`https://openlibrary.org${dadosLivro?.authors[0]?.key}.json`);
                    autorNome = dadosAutor?.name;
                }
                catch(err){
                    console.log("Não foi achado um autor");
                }
            }
            
            if(dadosLivro?.works[0]?.key){
                try{
                    const { data: dadosWork } = await axios.get(`https://openlibrary.org${dadosLivro.works[0].key}.json`);

                    if(dadosWork?.description?.value){
                        livroSinopse = dadosWork?.description?.value; 
                    } else livroSinopse = dadosWork?.description;

                    if(dadosWork?.genres[0]){
                        try{
                            const { data: dadosTag } = await axios.get(`https://openlibrary.org${dadosWork?.genres[0]}.json`);
                            livroGenero = dadosTag?.name;
                        } catch(err){

                        }
                    } else livroGenero = dadosWork?.subjects[0];
                } catch(err) {

                }

            }
            
            setForm((f) => ({
                ...f,
                titulo: dadosLivro.title ?? f.titulo,
                autor: autorNome,
                capa: `https://covers.openlibrary.org/b/isbn/${form.isbn}-M.jpg` ?? f.capa,
                sinopse: livroSinopse,
                genero: livroGenero,
                ano_publicacao: dadosLivro.publish_date ? dadosLivro.publish_date.slice(-4) : f.ano_publicacao,
            }));

        } catch(err) {

        } finally {
            setCarregando(false);
            setBuscandoIsbn(false);  
        }
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    function handleChange(e){
        setForm((f) => ({ ...form, [e.target.name]: e.target.value }));
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
                            <div className='divisoria'>
                                <div className='form__campo'>
                                    <label htmlFor="isbn">ISBN</label>
                                    <div className='form__input'>
                                        <input  
                                            type="text" 
                                            name="isbn" 
                                            id="isbn"
                                            value={form.isbn} 
                                            onChange={handleChange}
                                            placeholder="Digite o ISBN do livro"
                                            required
                                        />
                                    </div>
                                </div>
                                <button type='button' className='btn-isbn' onClick={buscaIsbn}>
                                    <Search />
                                </button>
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                            placeholder="Digite o ano"
                                            required
                                        />
                                        <CalendarDays color='#60747B'/>
                                    </div>
                                </div>
                            </div>

                            <div className='form__campo'>
                                <label htmlFor="sinopse">Sinopse</label>
                                <div className='form__input form__input-grande'>
                                    <textarea  
                                        name="sinopse" 
                                        id="sinopse"
                                        value={form.sinopse} 
                                        onChange={handleChange}
                                        placeholder="Texto..."
                                    />
                                </div>
                            </div>

                        </div>
                    </form>

                    <div className='form__capa  form__capa-label'>
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
                                            onChange={handleChange}
                                            placeholder="https://..."
                                        />
                                        <Link color='#60747B'/>
                                    </div>
                                </div>
                    </div>       
                </div>
                
                <div className='tela-adicionar__fim'>
                    <hr />
                    <button type='button' onClick={handleSubmit} className='btn btn--block btn--primaria salvar'>
                        {carregando ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>

            </div>
        </div>
    )
}