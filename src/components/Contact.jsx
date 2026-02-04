import { businessConfig } from '../config';

export default function Contact() {
    return (
        <section id="contact" className="section-padding">
            <div className="container grid-2-cols">
                <div>
                    <span className="section-title-small">Contactanos</span>
                    <h2 className="section-title-large">Llamanos para <br /> Más Detalles</h2>

                    <div style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <span>Llamanos:</span> <br />
                        <span style={{ color: 'var(--accent-color)', fontSize: '2rem' }}>{businessConfig.phone}</span>
                    </div>

                    <div style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Visitanos:</span> <br />
                        <span style={{ color: 'var(--text-secondary)' }}>{businessConfig.address}</span>
                    </div>

                    <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
                        No dudes en contactarnos. Nuestro equipo está listo para ayudarte con cualquier consulta o para agendar tu próximo servicio.
                    </p>

                    <button onClick={() => window.open(`https://wa.me/${businessConfig.whatsappNumber}`, '_blank')} className="btn btn-primary">Pedir Turno</button>
                </div>

                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '40px', borderRadius: '4px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '5px' }}>
                        Horarios de Atención
                    </h3>
                    <ul style={{ listStyle: 'none', color: '#ddd' }}>
                        {businessConfig.hours.map((hour, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '15px 0',
                                borderBottom: index < businessConfig.hours.length - 1 ? '1px solid #444' : 'none',
                                color: hour.closed ? 'var(--danger-color)' : 'inherit'
                            }}>
                                <span>{hour.day}</span>
                                <span>{hour.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
