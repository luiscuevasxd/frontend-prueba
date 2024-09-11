'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export type WithRouterProps = {
  onNavigate: (path: string) => void;
};

export function WithRouter<T extends WithRouterProps = WithRouterProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithRouter(props: Omit<T, keyof WithRouterProps>) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const handleNavigate = (path: string) => {
      if (isClient) {
        router.push(path);
      }
    };

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        if (!token && !['/login', '/register'].includes(window.location.pathname)) {
          router.push('/login');
        } else if (token && ['/login', '/register'].includes(window.location.pathname)) {
          router.push('/');
        }
      };

      checkAuth();
      window.addEventListener('storage', checkAuth);

      return () => {
        window.removeEventListener('storage', checkAuth);
      };
    }, [router]);

    if (isAuthenticated === null || !isClient) {
      return null;
    }

    return <WrappedComponent {...(props as T)} onNavigate={handleNavigate} />;
  };
}
