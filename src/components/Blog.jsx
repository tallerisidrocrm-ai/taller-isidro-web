export default function Blog() {
    const posts = [
        { title: "5 Señales que tu Motor Necesita Atención", excerpt: "No ignores estas señales que podrían ahorrarte miles.", date: "12 Oct, 2025" },
        { title: "Tips de Mantenimiento para Invierno", excerpt: "Prepará tu vehículo para el frío con este checklist.", date: "28 Sep, 2025" },
        { title: "Aceite Sintético vs. Regular", excerpt: "Entendiendo qué aceite es mejor para la longevidad de tu auto.", date: "15 Ago, 2025" }
    ];

    return (
        <section id="blog" className="section-padding" style={{ backgroundColor: '#151515' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <span className="section-title-small">Blog</span>
                    <h2 className="section-title-large">Últimos Artículos</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Mantenete informado con nuestros consejos expertos.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {posts.map((post, i) => (
                        <div key={i} style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '4px', border: '1px solid #222' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '10px' }}>{post.date}</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>{post.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>{post.excerpt}</p>
                            <a href="#" style={{ fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem' }}>Leer Más &rarr;</a>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <button className="btn btn-secondary">Ver Blog</button>
                </div>
            </div>
        </section>
    );
}
