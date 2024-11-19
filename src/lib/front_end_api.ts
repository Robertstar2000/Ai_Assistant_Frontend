export async function redirectToContentPage(token: string, plan: 'free' | 'premium'): Promise<void> {
  const url = new URL('https://ominous-journey-5ggq4gxp6jxvcpxgw-5174.app.github.dev/');
  url.searchParams.append('token', token);
  url.searchParams.append('plan', plan);
  window.location.href = url.toString();
}

export async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  // Simulated subscription check
  return localStorage.getItem(`front_end_subscription_${userId}`) === 'active';
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