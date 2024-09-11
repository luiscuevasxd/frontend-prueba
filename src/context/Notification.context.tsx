'use client';
import { useLanguage } from '@hooks';
import React, { createContext, useCallback, useMemo } from 'react';
import { toast, ToastContainer, ToastContent } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationContextType {
  showNotificationSuccess: (message: ToastContent<string>) => void;
  showNotificationError: (message: ToastContent<string>) => void;
  showNotificationWarning: (message: ToastContent<string>) => void;
  showNotificationInfo: (message: ToastContent<string>) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleLanguage = useLanguage();

  const showNotificationSuccess = useCallback(
    (message: ToastContent<string>) => {
      const value = typeof message === 'string' ? handleLanguage(message) : message;

      toast.success(value);
    },
    [handleLanguage]
  );

  const showNotificationError = useCallback(
    (message: ToastContent<string>) => {
      const value = typeof message === 'string' ? handleLanguage(message) : message;

      toast.error(value);
    },
    [handleLanguage]
  );

  const showNotificationWarning = useCallback(
    (message: ToastContent<string>) => {
      const value = typeof message === 'string' ? handleLanguage(message) : message;

      toast.warning(value ?? message);
    },
    [handleLanguage]
  );

  const showNotificationInfo = useCallback(
    (message: ToastContent<string>) => {
      const value = typeof message === 'string' ? handleLanguage(message) : message;

      toast.info(value);
    },
    [handleLanguage]
  );

  const props = useMemo(
    () => ({
      showNotificationSuccess,
      showNotificationError,
      showNotificationWarning,
      showNotificationInfo,
    }),
    [showNotificationSuccess, showNotificationError, showNotificationWarning, showNotificationInfo]
  );

  return (
    <NotificationContext.Provider value={props}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
