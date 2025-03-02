import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './contexts/ProjectContext';
import { ProjectSetupProvider } from './contexts/ProjectSetupContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { ProjectSetup } from './components/setup/ProjectSetup';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <ProjectSetupProvider>
          <main className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<ProjectSetup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </ProjectSetupProvider>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
