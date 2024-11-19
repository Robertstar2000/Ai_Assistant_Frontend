import { supabase } from './supabase';

const CONTENT_PAGE_URL = 'https://ominous-journey-5ggq4gxp6jxvcpxgw-5174.app.github.dev/';

export async function redirectToContentPage(token: string, plan: 'free' | 'premium'): Promise<void> {
  const url = new URL(CONTENT_PAGE_URL);
  url.searchParams.append('token', token);
  url.searchParams.append('plan', plan);
  window.location.href = url.toString();
}

export async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.status === 'active';
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

export async function createStripeCheckoutSession(email: string, plan: string) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, plan })
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}