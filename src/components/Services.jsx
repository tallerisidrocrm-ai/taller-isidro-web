export default function Services() {
    const services = [
        { title: "Diagnóstico Computarizado", icon: "💻" },
        { title: "Mantenimiento General", icon: "🔧" },
        { title: "Performance", icon: "🏎️" },
        { title: "Detailing", icon: "✨" }
    ];

    return (
        <section id="services" className="section-padding">
            <div className="container" style={{ textAlign: 'center' }}>
                <span className="section-title-small">Nuestros Servicios</span>
                <h2 className="section-title-large">Servicios Premium <br /> de Última Generación</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
                    Cuidado integral diseñado para que tu vehículo funcione suave y seguro.
                </p>
                <button onClick={() => window.open('https://wa.me/5491159722457', '_blank')} className="btn btn-primary" style={{ marginBottom: '60px' }}>Ver Todos los Servicios</button>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                    {services.map((s, i) => (
                        <div key={i} style={{ backgroundColor: 'var(--bg-tertiary)', padding: '40px', borderRadius: '4px', textAlign: 'left', transition: 'transform 0.3s' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--accent-color)' }}>{s.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{s.title}</h3>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
