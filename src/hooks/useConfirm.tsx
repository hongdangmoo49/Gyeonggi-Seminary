import { useState, useCallback } from 'react';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export function useConfirm() {
  const [state, setState] = useState<{ message: string; resolve: (v: boolean) => void } | null>(null);

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({ message, resolve });
    });
  }, []);

  const handleClose = useCallback((result: boolean) => {
    state?.resolve(result);
    setState(null);
  }, [state]);

  const dialog = state ? (
    <ConfirmDialog message={state.message} onConfirm={() => handleClose(true)} onCancel={() => handleClose(false)} />
  ) : null;

  return { confirm, dialog };
}
