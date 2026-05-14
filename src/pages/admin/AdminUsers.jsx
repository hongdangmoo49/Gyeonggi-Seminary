import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { MdSearch, MdDelete, MdToggleOn, MdToggleOff } from 'react-icons/md';
import styles from './AdminUsers.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const toggleAdmin = async (userId, currentAdmin) => {
    await updateDoc(doc(db, 'users', userId), { isAdmin: !currentAdmin });
    setUsers(users.map((u) => u.id === userId ? { ...u, isAdmin: !currentAdmin } : u));
  };

  const handleDelete = async (userId) => {
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
            <th>가입일</th>
            <th>관리자</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td className={styles.name}>{u.name || '-'}</td>
              <td>{u.email}</td>
              <td>{u.createdAt?.slice(0, 10) || '-'}</td>
              <td>
                <button
                  className={`${styles.toggleBtn} ${u.isAdmin ? styles.active : ''}`}
                  onClick={() => toggleAdmin(u.id, u.isAdmin)}
                >
                  {u.isAdmin ? <MdToggleOn size={24} /> : <MdToggleOff size={24} />}
                  {u.isAdmin ? '관리자' : '일반'}
                </button>
              </td>
              <td>
                <button className={styles.deleteBtn} onClick={() => handleDelete(u.id)}>
                  <MdDelete size={18} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={5} className={styles.empty}>회원이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
