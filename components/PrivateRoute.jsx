// components/PrivateRoute.jsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const removeTokenOnUnload = () => {
      const removeToken = () => {
        localStorage.removeItem('token');
      };

      window.addEventListener('beforeunload', removeToken);
      window.addEventListener('unload', removeToken);

      return () => {
        window.removeEventListener('beforeunload', removeToken);
        window.removeEventListener('unload', removeToken);
      };
    };

    removeTokenOnUnload();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Admin/login'); 
    }
  }, []);

  return children;
};

export default PrivateRoute;
