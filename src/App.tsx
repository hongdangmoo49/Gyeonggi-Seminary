import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ToastContainer from './components/ui/ToastContainer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Layout from './components/layout/Layout';
import AdminGuard from './components/admin/AdminGuard';
import AdminLayout from './components/admin/AdminLayout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Greeting = lazy(() => import('./pages/Greeting'));
const Admission = lazy(() => import('./pages/Admission'));
const Undergraduate = lazy(() => import('./pages/Undergraduate'));
const Graduate = lazy(() => import('./pages/Graduate'));
const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const DocumentLibrary = lazy(() => import('./pages/DocumentLibrary'));
const Community = lazy(() => import('./pages/Community'));
const Board = lazy(() => import('./pages/Board'));
const Assembly = lazy(() => import('./pages/Assembly'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminAdmins = lazy(() => import('./pages/admin/AdminAdmins'));
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts'));
const AdminVideos = lazy(() => import('./pages/admin/AdminVideos'));
const AdminDocuments = lazy(() => import('./pages/admin/AdminDocuments'));

function PageFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0' }}>
      <LoadingSpinner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Gyeonggi-Seminary">
      <ErrorBoundary>
        <AuthProvider>
          <ToastContainer />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="greeting" element={<Greeting />} />
                <Route path="admission" element={<Admission />} />
                <Route path="undergraduate" element={<Undergraduate />} />
                <Route path="graduate" element={<Graduate />} />
                <Route path="video-library" element={<VideoLibrary />} />
                <Route path="document-library" element={<DocumentLibrary />} />
                <Route path="community" element={<Community />} />
                <Route path="board" element={<Board />} />
                <Route path="assembly" element={<Assembly />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <AdminGuard>
                    <AdminLayout />
                  </AdminGuard>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="admins" element={<AdminAdmins />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="videos" element={<AdminVideos />} />
                <Route path="documents" element={<AdminDocuments />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
