import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  exiting: boolean;
}

let nextId = 0;
const listeners: Set<(toasts: ToastItem[]) => void> = new Set();
let currentToasts: ToastItem[] = [];

function notify(list: ToastItem[]) {
  currentToasts = list;
  listeners.forEach((fn) => fn(list));
}

function addToast(type: ToastType, message: string, duration = 3000) {
  const id = nextId++;
  const updated = [...currentToasts, { id, type, message, exiting: false }];
  notify(updated);
  setTimeout(() => {
    notify(currentToasts.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      notify(currentToasts.filter((t) => t.id !== id));
    }, 300);
  }, duration);
}

export const toast = {
  success: (msg: string) => addToast('success', msg),
  error: (msg: string) => addToast('error', msg),
  info: (msg: string) => addToast('info', msg),
  warning: (msg: string) => addToast('warning', msg),
};

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>(currentToasts);
  useEffect(() => {
    listeners.add(setToasts);
    return () => { listeners.delete(setToasts); };
  }, []);
  return toasts;
}
