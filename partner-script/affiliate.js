
(function () {
  const AFF_COOKIE = 'aff';
  const DURATION = 30 * 24 * 60 * 60;

  const url = new URL(window.location.href);
  const aff = url.searchParams.get('aff');

  if (aff) {
    document.cookie = `${AFF_COOKIE}=${aff}; path=/; max-age=${DURATION}`;
  }

  function getAffiliateId() {
    const match = document.cookie.match(/aff=([^;]+)/);
    return match ? match[1] : null;
  }

  async function trackSale(orderId, amount) {
    const affiliateId = getAffiliateId();
    if (!affiliateId) return;

    await fetch('https://YOUR_SUPABASE_URL/functions/v1/record-sale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link_id: affiliateId, order_id: orderId, amount }),
    });
  }

  window.Affiliate = { trackSale, getAffiliateId };
})();
