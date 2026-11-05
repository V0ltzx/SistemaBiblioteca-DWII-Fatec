import { Routes, Route } from 'react-router-dom';
import Login from './pages/old/Login';
import Livros from './pages/old/livros';
import LivroAdd from './pages/old/livro_add';
import TelaLateral from './components/TelaLateral';
 
export default function App() {
  return (
    <TelaLateral>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/livro_add" element={<LivroAdd />} />
      </Routes>
    </TelaLateral>
    
  );
}