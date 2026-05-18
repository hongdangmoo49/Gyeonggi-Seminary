import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdChevronRight, MdLogin, MdLogout, MdPerson, MdAdminPanelSettings, MdDarkMode, MdLightMode } from 'react-icons/md';
import navigation from '../../data/navigation';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import LoginModal from '../ui/LoginModal';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggle: toggleTheme } = useTheme();
  const isAdmin = user?.isAdmin;
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
            <span className={styles.logoKr}>경기신학교</span>
            <span className={styles.logoEn}>Gyeonggi Seminary</span>
          </Link>

          <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
            <ul className={styles.menu}>
              {navigation.map((item) => (
                <li
                  key={item.label}
                  className={styles.menuItem}
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`${styles.menuLink} ${isActive(item.path) ? styles.active : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <span className={`${styles.menuLink} ${item.children?.some(c => isActive(c.path)) ? styles.active : ''}`}>
                        {item.label}
                      </span>
                      {item.children && activeDropdown === item.label && (
                        <ul className={styles.dropdown}>
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className={`${styles.dropdownLink} ${isActive(child.path) ? styles.active : ''}`}
                                onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  {item.children && mobileOpen && (
                    <ul className={styles.mobileSubmenu}>
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={`${styles.mobileSubLink} ${isActive(child.path) ? styles.active : ''}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <MdChevronRight /> {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile auth */}
            <div className={styles.mobileAuth}>
              <button className={styles.mobileThemeBtn} onClick={toggleTheme}>
                {isDark ? <><MdLightMode /> 라이트 모드</> : <><MdDarkMode /> 다크 모드</>}
              </button>
              {user ? (
                <div className={styles.mobileUserInfo}>
                  <MdPerson /> {user.name}님
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)}>
                      <MdAdminPanelSettings /> 관리자
                    </Link>
                  )}
                  <button onClick={async () => { await logout(); setMobileOpen(false); }}>
                    <MdLogout /> 로그아웃
                  </button>
                </div>
              ) : (
                <button className={styles.mobileLoginBtn} onClick={() => { setShowLogin(true); setMobileOpen(false); }}>
                  <MdLogin /> 로그인
                </button>
              )}
            </div>
          </nav>

          <div className={styles.right}>
            <button className={styles.themeBtn} onClick={toggleTheme} aria-label={isDark ? '라이트 모드' : '다크 모드'}>
              {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>
            <div className={styles.authArea}>
              {user ? (
                <div className={styles.userInfo}>
                  <MdPerson />
                  <span className={styles.userName}>{user.name}</span>
                  {isAdmin && (
                    <Link to="/admin" className={styles.adminLink} title="관리자 페이지">
                      <MdAdminPanelSettings />
                    </Link>
                  )}
                  <button className={styles.logoutBtn} onClick={() => logout()}>로그아웃</button>
                </div>
              ) : (
                <button className={styles.loginBtn} onClick={() => setShowLogin(true)}>
                  <MdLogin /> 로그인
                </button>
              )}
            </div>

            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {mobileOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>

        {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
