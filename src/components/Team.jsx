export default function Team() {
    const team = [
        { name: "Carlos Ruiz", role: "Jefe de Mecánicos", img: "/team1.jpg" },
        { name: "Ana Lopez", role: "Especialista en Diagnóstico", img: "/team2.jpg" },
        { name: "Miguel Santos", role: "Experto en Neumáticos", img: "/team3.jpg" }
    ];

    return (
        <section id="team" className="section-padding" style={{ backgroundColor: '#151515' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '50px' }}>
                    <div>
                        <span className="section-title-small">Equipo</span>
                        <h2 className="section-title-large">Conocé a Nuestro Equipo</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Expertos dedicados a la salud de tu vehículo.</p>
                    </div>
                    <button className="btn btn-secondary">Ver Todo el Equipo</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {team.map((member, i) => (
                        <div key={i} style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                            <div style={{ height: '400px', backgroundColor: '#333' }}>
                                {/* Placeholder for image */}
                                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'var(--accent-color)', padding: '15px 20px', color: '#000', width: '80%' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>{member.name}</h3>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
