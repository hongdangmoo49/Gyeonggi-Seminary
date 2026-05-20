import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdPeople, MdArticle, MdVideoLibrary, MdDescription, MdLogout, MdMenu, MdClose, MdShield } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import { toast } from '../../hooks/useToast';
import styles from './AdminLayout.module.css';

const NAV = [
  { to: '/admin', icon: MdDashboard, label: '대시보드', end: true },
  { to: '/admin/admins', icon: MdShield, label: '관리자 목록' },
  { to: '/admin/users', icon: MdPeople, label: '회원 관리' },
  { to: '/admin/posts', icon: MdArticle, label: '게시글 관리' },
  { to: '/admin/videos', icon: MdVideoLibrary, label: '동영상 관리' },
  { to: '/admin/documents', icon: MdDescription, label: '자료실 관리' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    toast.info('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>관리자</h2>
          <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>
            <MdClose />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || user?.email}</span>
            <span className={styles.userRole}>{user?.isSuperAdmin ? '최고관리자' : '관리자'}</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <MdLogout /> 로그아웃
          </button>
          <button className={styles.homeBtn} onClick={() => navigate('/')}>
            홈으로
          </button>
        </div>
      </aside>

      <div className={styles.overlay} onClick={() => setSidebarOpen(false)} style={{ display: sidebarOpen ? 'block' : 'none' }} role="presentation" aria-hidden="true" />

      <main className={styles.main}>
        <div className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            <MdMenu size={24} />
          </button>
          <span className={styles.topbarTitle}>경기신학교 관리자</span>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
