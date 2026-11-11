import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import LoginOld from './pages/old/Login';
import LivrosOld from './pages/old/livros';
import Biblioteca from './pages/Biblioteca'
import Login from './pages/Login';
import Registrar from './pages/Registrar'
import LivroAdd from './pages/old/livro_add';
import TelaLateral from './components/TelaLateral';
import Home from './pages/Home';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import RotaProtegida from './components/RotaProtegida';
 
export default function App() {
  const Navigate = useNavigate(); 

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path='/home' 
          element={
            <TelaLateral>
              <Home />
            </TelaLateral> 
          }
        />
        <Route path='/livros' 
          element={
            <TelaLateral>
              <Biblioteca />
            </TelaLateral> 
          }
        />
        <Route path="/livrosold" element={<LivrosOld />} />
        <Route path="/livro_add" element={<LivroAdd />} />
      </Routes>
    </AuthProvider>
  );
}