import { businessConfig } from '../config';

export default function Bodywork() {
    return (
        <section id="bodywork" className="section-padding" style={{ position: 'relative', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            {/* Video Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                    <source src="/bodywork-video.mp4" type="video/mp4" />
                    {/* Fallback to image if video missing */}
                    <img src="/bodywork..jpg" alt="Chapa y Pintura" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </video>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
                <span className="section-title-small" style={{ color: 'var(--accent-color)' }}>Servicios Especializados</span>
                <h2 className="section-title-large" style={{ marginTop: '10px', fontSize: '3rem' }}>Chapa y <br /> Pintura</h2>
                <p style={{ color: '#ddd', marginBottom: '30px', fontSize: '1.2rem', lineHeight: '1.8' }}>
                    Devolvemos a tu auto su estética original con acabados de fábrica. Utilizamos materiales de primera calidad y tecnología de igualación de color computarizada para garantizar resultados impecables en reparaciones de choques, granizo y rayones.
                </p>
                <button onClick={() => window.open(`https://wa.me/${businessConfig.whatsappNumber}?text=Hola,%20quisiera%20presupuesto%20de%20Chapa%20y%20Pintura`, '_blank')} className="btn btn-primary">Solicitar Presupuesto</button>
            </div>
        </section>
    );
}
