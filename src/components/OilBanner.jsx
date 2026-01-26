import { businessConfig } from '../config';

export default function OilBanner() {
    return (
        <section style={{ backgroundColor: 'var(--accent-color)', padding: '25px 0' }}>
            <div className="container insurance-banner-content">
                <h3 style={{ color: '#000', fontWeight: 'bold', fontSize: '1.5rem', margin: 0, textTransform: 'uppercase' }}>
                    ¿Ya hiciste 10.000 kms? Toca cambiar el aceite
                </h3>
                <button onClick={() => window.open(`https://wa.me/${businessConfig.whatsappNumber}?text=Hola,%20quisiera%20turno%20para%20cambio%20de%20aceite`, '_blank')} className="btn" style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}>
                    Pedir Turno
                </button>
            </div>
        </section>
    );
}
