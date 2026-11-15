// App.jsx — routes, layout shell, theme provider
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
import Home          from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggle} />
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/projects/:slug"     element={<ProjectDetail />} />
        {/* Catch-all → home */}
        <Route path="*"                   element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
