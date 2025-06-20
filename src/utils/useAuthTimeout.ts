'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';

export const useAuthTimeout = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTimeout = async () => {
      const loginTime = localStorage.getItem('loginTime');
      if (!loginTime) return;

      const now = Date.now();
      const diffInMinutes = (now - parseInt(loginTime, 10)) / (1000 * 60);

      if (diffInMinutes >= 5) {
        await signOut();
        localStorage.removeItem('loginTime');
        alert('Session expired. Please log in again.');
        router.push('/auth/sign-in');
      }
    };

    checkTimeout();
    const interval = setInterval(checkTimeout, 10000); // check every 10s

    return () => clearInterval(interval);
  }, [router]);
};
