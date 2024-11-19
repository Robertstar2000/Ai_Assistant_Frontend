import { useState, useEffect } from 'react';
import { checkSubscriptionStatus } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export function useSubscription() {
  const { user } = useAuth();
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);

  useEffect(() => {
    if (user) {
      const checkStatus = async () => {
        const status = await checkSubscriptionStatus(user.id);
        setIsSubscriptionActive(status);
      };

      checkStatus();
      // Check subscription status every hour
      const interval = setInterval(checkStatus, 3600000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return isSubscriptionActive;
}