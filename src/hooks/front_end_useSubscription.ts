import { useState, useEffect } from 'react';
import { checkSubscriptionStatus } from '../lib/front_end_api';
import { useAuth } from '../context/front_end_AuthContext';

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
      const interval = setInterval(checkStatus, 3600000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return isSubscriptionActive;
}