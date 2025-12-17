export default function Hero() {
    return (
        <section id="home" style={{
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start'
        }}>
            {/* Video Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 1
                }}></div>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    {/* Fallback image if video fails or is not supported */}
                    <img src="/hero-bg.jpg" alt="Workshop background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </video>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '77px', paddingBottom: '50px' }}>
                <div style={{ maxWidth: '800px' }}>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.1', marginBottom: '15px' }}>
                        Tu Servicio <br />
                        <span style={{ color: 'var(--accent-color)' }}>Integral</span> <br />
                        Para el Auto
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '30px', maxWidth: '600px' }}>
                        Mantenimiento profesional y reparaciones confiables. Devolvemos la vida a tu vehículo con cuidado experto y repuestos de primera calidad.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        <button onClick={() => window.open('https://wa.me/5491159722457', '_blank')} className="btn btn-primary">Solicitar Presupuesto</button>
                        <button onClick={() => window.open('https://wa.me/5491159722457?text=Hola,%20necesito%20una%20inspección%20para%20el%20seguro', '_blank')} className="btn btn-secondary">Inspección Seguro</button>
                    </div>

                    <div className="hero-features-grid">
                        {[
                            { title: "Mecánicos Expertos", icon: "🔧" },
                            { title: "Atención Amable", icon: "🤝" },
                            { title: "Marca Confiable", icon: "🛡️" },
                            { title: "Mejor Precio", icon: "💲" }
                        ].map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                <span style={{ fontWeight: '700', fontSize: '0.9rem', lineHeight: '1.2' }}>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
