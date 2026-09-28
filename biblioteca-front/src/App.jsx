import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Livros from './pages/livros';
import LivroAdd from './pages/livro_add';
 
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/livros" element={<Livros />} />
      <Route path="/livro_add" element={<LivroAdd />} />
    </Routes>
  );
}