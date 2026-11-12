import '../styles/Emprestimos.css';
import { useState, useEffect } from 'react';
import ItemEmprestimo from '../components/ItemEmprestimo';
import api from '../api/client';

export default function Emprestimos(){
    const [emprestimos, setEmprestimos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarEmprestimos();
    }, []);

    async function buscarEmprestimos(){
        await api.get('/emprestimos')
                 .then((res) => {
                    setEmprestimos(res.data.data);
                    setCarregando(false);
                 });
    } 

    return(
        <div>
            <div className='emprestimos__topo'>
                <p className='eyebrow'>EMPRÉSTIMOS</p>
                <h1>Meus empréstimos</h1>
                <p className='emprestimos__topo-mutado'>Acompanhe seu histórico de leituras e os prazos de devolução</p>
            </div>

            <div className='emprestimos__lista'>
                {carregando ? (<center><br /><div className="loader"></div></center>) 
                            : (
                                <ul>
                                    {emprestimos.map((emprestimo) => (
                                        emprestimo.status && (
                                            <ItemEmprestimo 
                                                key={emprestimo.emprestimo_id}
                                                emprestimo={emprestimo}
                                                onDevolver={() => buscarEmprestimos()}
                                            />
                                        )
                                    ))}
                                </ul>
                            )}
            </div>
        </div>
    )
}