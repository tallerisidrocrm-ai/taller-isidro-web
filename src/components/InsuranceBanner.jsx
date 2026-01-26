import { businessConfig } from '../config';

export default function InsuranceBanner() {
    return (
        <section style={{ backgroundColor: 'var(--accent-color)', padding: '25px 0' }}>
            <div className="container insurance-banner-content">
                <h3 style={{ color: '#000', fontWeight: 'bold', fontSize: '1.5rem', margin: 0, textTransform: 'uppercase' }}>
                    ¿Necesitás inspeccionar tu auto para el seguro?
                </h3>
                <button onClick={() => window.open(`https://wa.me/${businessConfig.whatsappNumber}?text=Hola,%20necesito%20una%20inspección%20para%20el%20seguro`, '_blank')} className="btn" style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}>
                    Click acá para inspección
                </button>
            </div>
        </section>
    );
}
