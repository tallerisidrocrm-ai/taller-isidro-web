export default function Contact() {
    return (
        <section id="contact" className="section-padding">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                <div>
                    <span className="section-title-small">Contactanos</span>
                    <h2 className="section-title-large">Llamanos para <br /> Más Detalles</h2>

                    <div style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <span>Llamanos:</span> <br />
                        <span style={{ color: 'var(--accent-color)', fontSize: '2rem' }}>11 5972-2457</span>
                    </div>

                    <div style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Visitanos:</span> <br />
                        <span style={{ color: 'var(--text-secondary)' }}>Gervasio de Posadas 999, Béccar</span>
                    </div>

                    <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
                        No dudes en contactarnos. Nuestro equipo está listo para ayudarte con cualquier consulta o para agendar tu próximo servicio.
                    </p>

                    <button onClick={() => window.open('https://wa.me/5491159722457', '_blank')} className="btn btn-primary">Pedir Turno</button>
                </div>

                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '40px', borderRadius: '4px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '5px' }}>
                        Horarios de Atención
                    </h3>
                    <ul style={{ listStyle: 'none', color: '#ddd' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #444' }}>
                            <span>Lunes - Viernes</span>
                            <span>8:00 - 16:30 hs</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #444' }}>
                            <span>Sábado</span>
                            <span>8:00 - 13:00 hs</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', color: 'var(--danger-color)' }}>
                            <span>Domingo</span>
                            <span>Cerrado</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
