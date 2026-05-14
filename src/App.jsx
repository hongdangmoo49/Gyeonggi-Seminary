import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/layout/Layout';
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

export default function App() {
  return (
    <BrowserRouter basename="/Gyeonggi-Seminary">
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
