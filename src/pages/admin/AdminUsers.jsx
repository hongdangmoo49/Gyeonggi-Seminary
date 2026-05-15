import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { MdSearch, MdDelete, MdShield } from 'react-icons/md';
import styles from './AdminUsers.module.css';

const ROLE_LABELS = {
  superAdmin: '최고관리자',
  admin: '관리자',
  user: '일반',
};

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const isSuperAdmin = me?.isSuperAdmin;

  useEffect(() => {
    async function fetchUsers() {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const setRole = async (userId, newRole) => {
    await updateDoc(doc(db, 'users', userId), { role: newRole });
    setUsers(users.map((u) => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleDelete = async (userId) => {
    const target = users.find((u) => u.id === userId);
    if (target?.role === 'superAdmin') {
      alert('최고관리자는 삭제할 수 없습니다.');
      return;
    }
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'users', userId));
    setUsers(users.filter((u) => u.id !== userId));
  };

  const filtered = users.filter((u) =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div>
      <h1 className={styles.title}>회원 관리</h1>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <MdSearch />
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className={styles.count}>총 {filtered.length}명</span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>역할</th>
            <th>가입일</th>
            {isSuperAdmin && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => {
            const role = u.role || (u.isAdmin ? 'admin' : 'user');
            return (
              <tr key={u.id}>
                <td className={styles.name}>
                  {u.name || '-'}
                  {role === 'superAdmin' && <MdShield className={styles.superIcon} />}
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`${styles.badge} ${styles[role]}`}>
                    {ROLE_LABELS[role]}
                  </span>
                </td>
                <td>{u.createdAt?.slice(0, 10) || '-'}</td>
                {isSuperAdmin && (
                  <td>
                    {u.id !== me.uid && role !== 'superAdmin' && (
                      <div className={styles.actions}>
                        {role === 'user' && (
                          <button
                            className={styles.promoteBtn}
                            onClick={() => setRole(u.id, 'admin')}
                          >
                            관리자 임명
                          </button>
                        )}
                        {role === 'admin' && (
                          <button
                            className={styles.demoteBtn}
                            onClick={() => setRole(u.id, 'user')}
                          >
                            관리자 해제
                          </button>
                        )}
                        <button className={styles.deleteBtn} onClick={() => handleDelete(u.id)}>
                          <MdDelete size={18} />
                        </button>
                      </div>
                    )}
                    {u.id === me.uid && (
                      <span className={styles.self}>본인</span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
          {filtered.length === 0 && (
            <tr><td colSpan={isSuperAdmin ? 5 : 4} className={styles.empty}>회원이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
