import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, createProduct } from '../api/products';
import { createAffiliateLink } from '../api/affiliate';
import { createBrand, getBrands } from '../api/brands';
import { getAffiliates } from '../api/affiliates';
import Toast from '../components/Toast';
import { useTranslation } from 'react-i18next';

type Product = {
  id: string;
  name: string;
  price: number;
  commission_percent: number;
  landing_url: string;
  brand_id: string;
};

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [creatingProduct, setCreatingProduct] = useState<boolean>(false);

  // Modal state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string>(''); // '' means 'Me'
  const [generatingLink, setGeneratingLink] = useState(false);

  const [creatingLinkId, setCreatingLinkId] = useState<string | null>(null);
  const [creatingBrand, setCreatingBrand] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const [form, setForm] = useState({
    name: '',
    price: '',
    commission_percent: '30',
    landing_url: '',
    brand_id: ''
  });

  const [brandForm, setBrandForm] = useState({
    name: '',
    domain: ''
  });

  useEffect(() => {
    refreshProducts();
    refreshBrands();
    loadAffiliates();
  }, []);

  function refreshProducts() {
    setLoading(true);
    getProducts().then(({ data }) => {
      setProducts((data as Product[]) ?? []);
      setLoading(false);
    });
  }

  function refreshBrands() {
    getBrands().then(({ data }) => {
      setBrands(data ?? []);
      if (!form.brand_id && data?.[0]?.id) {
        setForm((f) => ({ ...f, brand_id: data[0].id }));
      }
    });
  }

  async function loadAffiliates() {
    const { data } = await getAffiliates();
    setAffiliates(data || []);
  }

  async function handleCreateBrand() {
    if (!brandForm.name || !brandForm.domain) {
      setToast({ message: t('forms.required'), type: 'error' });
      return;
    }
    setCreatingBrand(true);
    const { error } = await createBrand({ name: brandForm.name, domain: brandForm.domain });
    setCreatingBrand(false);
    if (error) {
      setToast({ message: error.message, type: 'error' });
      return;
    }
    setBrandForm({ name: '', domain: '' });
    setToast({ message: t('common.success'), type: 'success' });
    refreshBrands();
  }

  async function handleCreateProduct() {
    if (!form.name || !form.price || !form.landing_url || !form.brand_id) {
      setToast({ message: t('forms.required'), type: 'error' });
      return;
    }

    const landingUrl = (() => {
      const trimmed = form.landing_url.trim();
      if (!trimmed) return '';
      if (/^https?:\/\//i.test(trimmed)) return trimmed;
      return `https://${trimmed}`;
    })();

    setCreatingProduct(true);
    const { error } = await createProduct({
      name: form.name,
      price: Number(form.price),
      commission_percent: Number(form.commission_percent || 0),
      landing_url: landingUrl,
      brand_id: form.brand_id
    });
    setCreatingProduct(false);
    if (error) {
      setToast({ message: error.message, type: 'error' });
      return;
    }
    setForm((f) => ({ ...f, name: '', price: '', landing_url: '' }));
    setToast({ message: t('common.success'), type: 'success' });
    refreshProducts();
  }

  // Open modal
  function openLinkModal(productId: string) {
    setSelectedProductId(productId);
    setSelectedAffiliateId(''); // Reset to 'Me'
    setShowLinkModal(true);
  }

  // Generate link ACTION
  async function handleGenerateLink() {
    if (!selectedProductId) return;

    setGeneratingLink(true);
    const targetId = selectedAffiliateId === '' ? undefined : selectedAffiliateId;

    const { error } = await createAffiliateLink(selectedProductId, undefined, targetId);

    setGeneratingLink(false);
    setShowLinkModal(false);

    if (error) setToast({ message: error.message, type: 'error' });
    else setToast({ message: t('links.linkCopied'), type: 'success' });
  }

  return (
    <main className="p-6 w-full space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
      <h1 className="text-2xl font-bold">{t('products.title')}</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-lg font-semibold">{t('products.createBrand')}</h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder={t('products.brandName')}
            value={brandForm.name}
            onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder={t('products.domain')}
            value={brandForm.domain}
            onChange={(e) => setBrandForm({ ...brandForm, domain: e.target.value })}
          />
        </div>
        <button
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          onClick={handleCreateBrand}
          disabled={creatingBrand}
        >
          {creatingBrand ? t('common.loading') : t('products.createBrand')}
        </button>
        <p className="text-sm text-gray-600">
          {t('products.createBrandHint')}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-lg font-semibold">{t('products.createProduct')}</h2>
        {brands.length === 0 && (
          <div className="p-3 bg-yellow-50 text-yellow-800 rounded text-sm">
            {t('products.noBrandWarning')}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder={t('products.productName')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={brands.length === 0}
          />
          <select
            className="border p-2 rounded"
            value={form.brand_id}
            onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
            disabled={brands.length === 0}
          >
            <option value="">{t('products.selectBrand')}</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            placeholder={t('products.price')}
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            disabled={brands.length === 0}
          />
          <input
            className="border p-2 rounded"
            placeholder={t('products.commission')}
            type="number"
            value={form.commission_percent}
            onChange={(e) => setForm({ ...form, commission_percent: e.target.value })}
            disabled={brands.length === 0}
          />
          <input
            className="border p-2 rounded col-span-2"
            placeholder={t('products.landingUrl')}
            value={form.landing_url}
            onChange={(e) => setForm({ ...form, landing_url: e.target.value })}
            disabled={brands.length === 0}
          />
        </div>

        {/* Dynamic Commission Preview */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-800 font-medium">Aperçu de la commission influenceur</p>
            <p className="text-xs text-blue-600">Calculé sur la base du prix et du pourcentage</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-700">
              {form.price && form.commission_percent
                ? (Number(form.price) * Number(form.commission_percent) / 100).toFixed(2)
                : '0.00'}€
            </span>
            <span className="text-sm text-blue-600 ml-1">par vente</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleCreateProduct}
            disabled={creatingProduct || brands.length === 0}
          >
            {creatingProduct ? t('common.loading') : t('products.createProduct')}
          </button>
        </div>

      </div>

      {loading && <div className="text-gray-600 mb-2">{t('common.loading')}</div>}
      {!loading && products.length === 0 && (
        <div className="bg-white p-4 rounded shadow text-gray-600">{t('products.noProducts')}</div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded flex flex-col gap-2">
            <div>
              <h2 className="font-semibold text-lg mb-1">{p.name}</h2>
              <p className="text-gray-700 mb-1">{p.price}€</p>
              <p className="text-sm text-gray-500">
                {t('products.commission')} : {p.commission_percent}% ({(p.price * p.commission_percent / 100).toFixed(2)}€)
              </p>
            </div>
            <Link
              to={`/products/${p.id}`}
              className="text-blue-600 text-sm underline underline-offset-2"
            >
              {t('products.viewDetails')}
            </Link>
            <button
              className="bg-green-600 text-white px-3 py-2 rounded text-sm disabled:opacity-60"
              onClick={() => openLinkModal(p.id)}
            >
              {t('links.createLink')}
            </button>
          </div>
        ))}
      </div>

      {/* MODAL GENERATION LIEN */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{t('links.generateTitle')}</h2>
            <p className="text-sm text-gray-600">{t('links.generateSubtitle')}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('links.selectInfluencer')}
              </label>
              <select
                className="w-full border p-2 rounded"
                value={selectedAffiliateId}
                onChange={(e) => setSelectedAffiliateId(e.target.value)}
              >
                <option value="">{t('links.forMyself')}</option>
                {affiliates.map(aff => (
                  <option key={aff.id} value={aff.id}>
                    {aff.display_name || t('influencers.unnamed')}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded"
                onClick={() => setShowLinkModal(false)}
              >
                {t('common.cancel')}
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={handleGenerateLink}
                disabled={generatingLink}
              >
                {generatingLink ? t('common.loading') : t('links.generate')}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
