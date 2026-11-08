import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import LoginOld from './pages/old/Login';
import LivrosOld from './pages/old/livros';
import Biblioteca from './pages/Biblioteca'
import Login from './pages/Login';
import Registrar from './pages/Registrar'
import LivroAdd from './pages/old/livro_add';
import TelaLateral from './components/TelaLateral';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
 
export default function App() {
  const Navigate = useNavigate(); 

  function LayoutBarraLateral() {
  return (
    <TelaLateral>
      <Outlet />
    </TelaLateral>
  );
}

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>

      <Routes element={<LayoutBarraLateral />}>
        <Route path="/" element={<Navigate to="/livros" replace />} />
        <Route path="/loginold" element={<LoginOld />} />
        <Route path='/livros' element={<Biblioteca />} />
        <Route path="/livrosold" element={<LivrosOld />} />
        <Route path="/livro_add" element={<LivroAdd />} />
      </Routes>
    </AuthProvider>
  );
}