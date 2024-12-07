export const event = (eventName: string, params: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  } else {
    console.warn('Facebook Pixel is not initialized or unavailable.');
  }
};
