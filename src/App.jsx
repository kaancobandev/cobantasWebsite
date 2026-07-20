import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Yönetim paneli yalnızca /admin'e girilince yüklenir (public paketi şişirmesin)
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hakkimizda" element={<About />} />
        <Route path="projeler" element={<Projects />} />
        <Route path="projeler/:id" element={<ProjectDetail />} />
        <Route path="iletisim" element={<Contact />} />
        {/* Bilinmeyen adresler: sessizce anasayfa yerine gerçek 404 sayfası */}
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Yönetim paneli — public layout (navbar/footer) dışında */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="grid min-h-screen place-items-center text-ink-500">Yükleniyor…</div>}>
            <AdminPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
