import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/TelaCarregamento.css';
import '../styles/global.css';

export default function RotaProtegida({ children, perm }) {
  const { usuario, carregando} = useAuth();

  if (carregando) {
    return(
      <div id="loading-screen" className="loading-container">
        <div className="loading-content">
            <center><div className="loader"></div></center>
            <h2 id="loading-title">Preparando seu ambiente...</h2>
            <p id="loading-text">Estamos organizando os dados para você.</p>
        </div>
      </div>
    )
  }
  
  return usuario ? children : <Navigate to="/login" replace />;
}
