import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || (userDoc.exists() ? userDoc.data().name : ''),
          isAdmin: userDoc.exists() ? userDoc.data().isAdmin || false : false,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      const messages = {
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
        'auth/invalid-credential': '아이디 또는 비밀번호가 일치하지 않습니다.',
        'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
        'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
      };
      return { success: false, message: messages[err.code] || '로그인에 실패했습니다.' };
    }
  };

  const register = async (email, password, name) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await setDoc(doc(db, 'users', credential.user.uid), {
        name,
        email,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
      };
      return { success: false, message: messages[err.code] || '회원가입에 실패했습니다.' };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(() => ({ user, login, register, logout, loading }), [user, loading]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
