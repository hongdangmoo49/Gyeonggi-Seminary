import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gyeonggi-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('gyeonggi-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gyeonggi-user');
    }
  }, [user]);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('gyeonggi-users') || '[]');
    const found = users.find((u) => u.username === username && u.password === password);
    if (found) {
      setUser({ username: found.username, name: found.name });
      return { success: true };
    }
    return { success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
  };

  const register = (username, password, name) => {
    const users = JSON.parse(localStorage.getItem('gyeonggi-users') || '[]');
    if (users.find((u) => u.username === username)) {
      return { success: false, message: '이미 존재하는 아이디입니다.' };
    }
    users.push({ username, password, name });
    localStorage.setItem('gyeonggi-users', JSON.stringify(users));
    setUser({ username, name });
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
