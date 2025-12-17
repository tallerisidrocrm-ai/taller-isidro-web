export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#000', paddingTop: '80px', borderTop: '1px solid #222', color: '#888' }}>
            <div className="container grid-4-cols" style={{ paddingBottom: '60px', borderBottom: '1px solid #222' }}>
                <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff', marginBottom: '20px' }}>
                        TALLER <span style={{ color: 'var(--accent-color)' }}>ISIDRO</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                        Servicios profesionales de reparación de autos en los que podés confiar.
                    </p>
                    <div style={{ fontSize: '0.9rem' }}>
                        📍 Gervasio de Posadas 999 <br />
                        Béccar (B1643FTQ), Bs. As.
                    </div>
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Nuestros Servicios</h4>
                    <ul style={{ listStyle: 'none', fontSize: '0.9rem', lineHeight: '2' }}>
                        <li>Diagnóstico Computarizado</li>
                        <li>Mantenimiento General</li>
                        <li>Performance</li>
                        <li>Detailing</li>
                    </ul>
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Horarios</h4>
                    <ul style={{ listStyle: 'none', fontSize: '0.9rem', lineHeight: '2' }}>
                        <li>Lun - Vie: 8:00 - 16:30 hs</li>
                        <li>Sábado: 8:00 - 13:00 hs</li>
                        <li>Domingo: Cerrado</li>
                    </ul>
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Llamanos</h4>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '20px' }}>
                        11 5972-2457
                    </div>
                    <button onClick={() => window.open('https://wa.me/5491159722457', '_blank')} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>Solicitar Presupuesto</button>
                </div>
            </div>

            <div className="container" style={{ padding: '30px 0', textAlign: 'center', fontSize: '0.8rem' }}>
                &copy; {new Date().getFullYear()} Taller Isidro. Todos los derechos reservados. Creado con React.
            </div>
        </footer>
    );
}
