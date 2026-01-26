import { businessConfig } from '../config';
import './Services.css';

export default function Services() {
    // Mapping config services to visual assets
    // Ensure the order matches businessConfig.services or use the string to find match
    const serviceDetails = {
        "Diagnóstico Computarizado": {
            icon: "💻",
            bgClass: "bg-diagnostico",
            description: "Análisis preciso con tecnología de punta."
        },
        "Mecánica Integral": {
            icon: "🔧",
            bgClass: "bg-mecanica",
            description: "Soluciones expertas para cada componente."
        },
        "Performance": {
            icon: "🏎️",
            bgClass: "bg-performance",
            description: "Optimización para máxima potencia y respuesta."
        },
        "Detailing": {
            icon: "✨",
            bgClass: "bg-detailing",
            description: "Estética y protección superior para tu auto."
        },
        "Chapa y Pintura": {
            icon: "🎨",
            bgClass: "bg-chapa",
            description: "Reparación de carrocería y pintura de alta calidad."
        }
    };

    return (
        <section id="services" className="section-padding">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span className="section-title-small">Excelencia Técnica</span>
                    <h2 className="section-title-large">Servicios Premium <br /> de Última Generación</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 30px', color: 'var(--text-secondary)' }}>
                        Cuidado integral diseñado para que tu vehículo funcione suave y seguro.
                    </p>
                    <button onClick={() => window.open(`https://wa.me/${businessConfig.whatsappNumber}`, '_blank')} className="btn btn-primary">Ver Todos los Servicios</button>
                </div>

                <div className="services-grid">
                    {businessConfig.services.map((serviceName, index) => {
                        // Handle name change mismatch if config wasn't reloaded perfectly or just key matching
                        // We map "Mantenimiento General" to "Mecánica Integral" if present in old config, but we updated config.
                        const detail = serviceDetails[serviceName] || { icon: "⚙️", bgClass: "", description: "Servicio especializado." };

                        return (
                            <div key={index} className={`service-card ${detail.bgClass}`}>
                                <div className="service-overlay">
                                    {/* Icon removed per request */}
                                    <h3 className="service-title">{serviceName}</h3>
                                    <div className="service-line"></div>
                                    <p style={{ color: '#ccc', marginTop: '10px', fontSize: '0.9rem' }}>{detail.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
