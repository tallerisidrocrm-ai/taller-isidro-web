export default function About() {
    return (
        <section id="about" className="section-padding" style={{ backgroundColor: '#151515' }}>
            <div className="container grid-2-cols">
                <div>
                    <span className="section-title-small">Nosotros</span>
                    <h2 className="section-title-large">Expertos en <br /> Mecánica Automotriz</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        Somos un equipo dedicado de expertos automotrices comprometidos con brindar un servicio de primer nivel para tu vehículo.
                        Con años de experiencia y herramientas de diagnóstico de última generación, aseguramos tu seguridad y satisfacción
                        en cada kilómetro.
                    </p>
                    <button className="btn btn-primary">Sobre Nosotros</button>
                </div>
                <div>
                    <img src="/mechanic.jpg" alt="Expert mechanic working on engine" style={{ borderRadius: '4px', width: '100%', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
                </div>
            </div>
        </section>
    );
}
