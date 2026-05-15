import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { MdShield } from 'react-icons/md';
import styles from './AdminAdmins.module.css';

const ROLE_LABELS = {
  superAdmin: '최고관리자',
  admin: '관리자',
};

export default function AdminAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmins() {
      const snap = await getDocs(collection(db, 'users'));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((u) => u.role === 'admin' || u.role === 'superAdmin' || u.isAdmin);
      list.sort((a, b) => (a.role === 'superAdmin' ? -1 : 1));
      setAdmins(list);
      setLoading(false);
    }
    fetchAdmins();
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div>
      <h1 className={styles.title}>관리자 목록</h1>

      <div className={styles.grid}>
        {admins.map((admin) => {
          const role = admin.role || (admin.isAdmin ? 'admin' : 'user');
          return (
            <div key={admin.id} className={styles.card}>
              <div className={`${styles.avatar} ${styles[role]}`}>
                {role === 'superAdmin' ? <MdShield size={28} /> : (admin.name?.[0] || '?')}
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{admin.name || '-'}</span>
                <span className={styles.email}>{admin.email}</span>
                <span className={`${styles.badge} ${styles[role]}`}>
                  {ROLE_LABELS[role]}
                </span>
              </div>
            </div>
          );
        })}
        {admins.length === 0 && (
          <p className={styles.empty}>관리자가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
