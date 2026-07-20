import { Component } from 'react';

// Beklenmedik bir render hatasında tüm sitenin beyaz ekrana düşmesini engeller.
// Kasıtlı olarak sade tutuldu: context/router/çeviriye bağımlı DEĞİL, çünkü hata
// tam da onlardan birinde olabilir. Bu yüzden metinler iki dilde sabit yazılmıştır.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Geliştirici konsoluna bırak; ileride bir hata izleme servisine gönderilebilir.
    console.error('Beklenmeyen hata / Unexpected error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fafaf9', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ maxWidth: '520px', textAlign: 'center', border: '1px solid #e7e5e4', background: '#fff', padding: '40px' }}>
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '28px', color: '#1c1915' }}>
            Bir sorun oluştu
          </div>
          <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: 1.7, color: '#6f6557' }}>
            Sayfa görüntülenirken beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.
            Sorun devam ederse bizimle iletişime geçebilirsiniz.
          </p>
          <p style={{ marginTop: '8px', fontSize: '13px', lineHeight: 1.7, color: '#8d8170' }}>
            Something went wrong while displaying this page. Please refresh and try again.
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{ background: '#9a6a3c', color: '#fff', border: 0, padding: '14px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Sayfayı Yenile
            </button>
            <a
              href="/"
              style={{ border: '1px solid rgba(28,25,21,0.2)', color: '#2a2620', padding: '14px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Anasayfa
            </a>
          </div>
          <a href="mailto:info@cobantas.com" style={{ display: 'inline-block', marginTop: '24px', fontSize: '13px', color: '#9a6a3c' }}>
            info@cobantas.com
          </a>
        </div>
      </div>
    );
  }
}
