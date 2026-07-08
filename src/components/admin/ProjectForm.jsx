import { useState } from 'react';
import { X, UploadCloud, ImagePlus } from 'lucide-react';
import { supabase, MEDIA_BUCKET } from '../../lib/supabase';

const TYPES = ['Konut', 'Fabrika', 'Taahhüt'];

async function uploadFile(file, folder) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

export default function ProjectForm({ project, onSaved, onCancel }) {
  const editing = Boolean(project);
  const [title, setTitle] = useState(project?.title || '');
  const [type, setType] = useState(project?.type || 'Konut');
  const [area, setArea] = useState(project?.area_m2 ?? '');
  const [body, setBody] = useState(project?.body || '');

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(project?.cover_url || '');

  // Mevcut carousel görselleri (düzenlemede) + yeni eklenenler
  const [existingImages, setExistingImages] = useState(project?.images || []);
  const [carouselFiles, setCarouselFiles] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function handleCarousel(e) {
    const files = Array.from(e.target.files || []);
    setCarouselFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!editing && !coverFile) {
      setError('Lütfen bir kapak fotoğrafı seçin.');
      return;
    }
    setSaving(true);
    try {
      let cover_url = project?.cover_url || '';
      if (coverFile) cover_url = await uploadFile(coverFile, 'covers');

      const newUrls = [];
      for (const f of carouselFiles) {
        newUrls.push(await uploadFile(f, 'carousel'));
      }
      const images = [...existingImages, ...newUrls];

      const payload = {
        title: title.trim(),
        type,
        area_m2: area === '' ? null : Number(area),
        cover_url,
        body,
        images,
      };

      const query = editing
        ? supabase.from('projects').update(payload).eq('id', project.id)
        : supabase.from('projects').insert(payload);
      const { error } = await query;
      if (error) throw error;
      onSaved();
    } catch (err) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  }

  const field = 'w-full border border-stone-300 bg-stone-50 px-4 py-3 text-ink-900 outline-none transition-colors focus:border-bronze-600 focus:bg-white focus:ring-2 focus:ring-bronze-600/15';
  const label = 'mb-2 block text-[0.7rem] font-semibold uppercase tracking-widestx text-ink-500';

  return (
    <div className="border border-stone-200 bg-white p-6 shadow-soft md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink-900">{editing ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h2>
        <button onClick={onCancel} className="text-ink-400 transition-colors hover:text-ink-900" aria-label="Kapat">
          <X className="h-6 w-6" />
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Kapak fotoğrafı */}
        <div>
          <span className={label}>Kapak Fotoğrafı</span>
          <div className="flex items-center gap-5">
            <div className="grid h-28 w-40 flex-shrink-0 place-items-center overflow-hidden border border-stone-200 bg-stone-100">
              {coverPreview
                ? <img src={coverPreview} alt="Kapak önizleme" className="h-full w-full object-cover" />
                : <ImagePlus className="h-7 w-7 text-stone-400" />}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 border border-ink-900/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-bronze-600 hover:text-bronze-700">
              <UploadCloud className="h-4 w-4" />
              {coverPreview ? 'Değiştir' : 'Foto Seç'}
              <input type="file" accept="image/*" onChange={handleCover} className="hidden" />
            </label>
          </div>
        </div>

        {/* Proje adı */}
        <div>
          <label className={label}>Proje Adı</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={field} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Tür */}
          <div>
            <label className={label}>Tür</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={field}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {/* m2 */}
          <div>
            <label className={label}>Alan (m²)</label>
            <input type="number" min="0" value={area} onChange={(e) => setArea(e.target.value)} className={field} placeholder="örn. 12000" />
          </div>
        </div>

        {/* Detay metni */}
        <div>
          <label className={label}>Detay Metni (proje sayfasında görünür)</label>
          <textarea rows="6" value={body} onChange={(e) => setBody(e.target.value)} className={field} placeholder="Proje hakkında açıklama yazın…" />
        </div>

        {/* Carousel fotoğrafları */}
        <div>
          <span className={label}>Carousel Fotoğrafları (detay sayfasında kayan galeri)</span>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((url, i) => (
              <div key={`ex-${i}`} className="relative h-20 w-28 overflow-hidden border border-stone-200">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => setExistingImages((p) => p.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center bg-ink-950/70 text-white" aria-label="Kaldır">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {carouselFiles.map((f, i) => (
              <div key={`new-${i}`} className="relative h-20 w-28 overflow-hidden border border-bronze-300">
                <img src={URL.createObjectURL(f)} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => setCarouselFiles((p) => p.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center bg-ink-950/70 text-white" aria-label="Kaldır">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <label className="grid h-20 w-28 cursor-pointer place-items-center border border-dashed border-stone-300 text-stone-400 transition-colors hover:border-bronze-500 hover:text-bronze-600">
              <ImagePlus className="h-6 w-6" />
              <input type="file" accept="image/*" multiple onChange={handleCarousel} className="hidden" />
            </label>
          </div>
        </div>

        {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-bronze-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze-700 disabled:opacity-60">
            {saving ? 'Kaydediliyor…' : editing ? 'Güncelle' : 'Projeyi Kaydet'}
          </button>
          <button type="button" onClick={onCancel} className="border border-ink-900/20 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-800 transition-colors hover:border-ink-900">
            Vazgeç
          </button>
        </div>
      </form>
    </div>
  );
}
