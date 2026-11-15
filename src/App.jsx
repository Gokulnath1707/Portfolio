// App.jsx — routes, layout shell, theme provider
import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
import SplitFlapText from './components/SplitFlapText';
import Home          from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  const { theme, toggle } = useTheme();
  const [introComplete, setIntroComplete] = useState(false);
  const finishIntro = useCallback(() => setIntroComplete(true), []);

  return (
    <BrowserRouter>
      {introComplete ? (
        <>
          <Navbar theme={theme} toggleTheme={toggle} />
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/projects/:slug"     element={<ProjectDetail />} />
            {/* Catch-all → home */}
            <Route path="*"                   element={<Home />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-4"
          role="status"
          aria-busy="true"
        >
          <SplitFlapText
            words={['Cooking', 'Garnishing', 'Its Here!']}
            onComplete={finishIntro}
            loop={false}
            cycleDelay={400}
            flipDuration={0.05}
            stagger={0.015}
            flipsPerChar={3}
            charset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789! "
            padTo={10}
            align="center"
            order="center"
            fontSize="clamp(22px, 5vw, 48px)"
            gap={4}
            tileRadius={5}
            tileColor="var(--color-surface)"
            textColor="var(--color-accent)"
            depth={0.7}
          />
        </div>
      )}
    </BrowserRouter>
  );
}
