export default function Metrics() {
    const metrics = [
        { number: "1,885+", label: "Autos Felices" },
        { number: "99%", label: "Clientes Satisfechos" },
        { number: "+20", label: "Ingenieros y Mecánicos" }
    ];

    return (
        <section className="section-padding" style={{ position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
            {/* Video Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1 }}></div>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                    <source src="/metrics-video.mp4" type="video/mp4" />
                    <img src="/metrics-bg.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </video>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '10px', color: '#ccc' }}>
                    "El auto que manejamos dice mucho de nosotros."
                </p>
                <h2 className="section-title-large" style={{ marginBottom: '60px' }}>Nuestro Éxito en Números</h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '30px' }}>
                    {metrics.map((m, i) => (
                        <div key={i} style={{ minWidth: '150px' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)' }}>{m.number}</div>
                            <div style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
