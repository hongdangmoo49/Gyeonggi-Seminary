import { useState, useEffect, createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import type { AuthContextType, AuthResult, Role, User } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const data = userDoc.exists() ? userDoc.data() : {} as Record<string, unknown>;
        const role: Role = (data.role as Role) || ((data.isAdmin as boolean) ? 'admin' : 'user');
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || (data.name as string) || '',
          role,
          isAdmin: role === 'admin' || role === 'superAdmin',
          isSuperAdmin: role === 'superAdmin',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      const code = (err as { code: string }).code;
      const messages: Record<string, string> = {
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
        'auth/invalid-credential': '아이디 또는 비밀번호가 일치하지 않습니다.',
        'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
        'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
      };
      return { success: false, message: messages[code] || '로그인에 실패했습니다.' };
    }
  };

  const register = async (email: string, password: string, name: string): Promise<AuthResult> => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await setDoc(doc(db, 'users', credential.user.uid), {
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (err) {
      const code = (err as { code: string }).code;
      const messages: Record<string, string> = {
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
      };
      return { success: false, message: messages[code] || '회원가입에 실패했습니다.' };
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const value = useMemo<AuthContextType>(() => ({ user, login, register, logout, loading }), [user, loading]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
