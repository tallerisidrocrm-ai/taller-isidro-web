export default function TopBar() {
    return (
        <div className="top-bar" style={{ backgroundColor: '#000', padding: '10px 0', borderBottom: '1px solid #333' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#ccc' }}>
                <p>“Si tiene ruedas, lo arreglamos”  |  Abierto Lun-Sáb 7:00–18:00</p>
                <a href="tel:+1234567890" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Llamanos: (555) 123-4567</a>
            </div>
        </div>
    );
}
