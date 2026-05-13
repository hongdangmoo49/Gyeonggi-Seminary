import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdChevronRight } from 'react-icons/md';
import navigation from '../../data/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className={styles.logoKr}>경기신학교</span>
          <span className={styles.logoEn}>Gyeonggi Seminary</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {mobileOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>

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

                {/* Mobile submenu */}
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
        </nav>
      </div>

      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}
    </header>
  );
}
