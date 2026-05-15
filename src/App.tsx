import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import AdminGuard from './components/admin/AdminGuard';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Greeting from './pages/Greeting';
import Admission from './pages/Admission';
import Undergraduate from './pages/Undergraduate';
import Graduate from './pages/Graduate';
import VideoLibrary from './pages/VideoLibrary';
import DocumentLibrary from './pages/DocumentLibrary';
import Community from './pages/Community';
import Board from './pages/Board';
import Assembly from './pages/Assembly';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAdmins from './pages/admin/AdminAdmins';
import AdminPosts from './pages/admin/AdminPosts';
import AdminVideos from './pages/admin/AdminVideos';
import AdminDocuments from './pages/admin/AdminDocuments';

export default function App() {
  return (
    <BrowserRouter basename="/Gyeonggi-Seminary">
      <ErrorBoundary>
        <AuthProvider>
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
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
