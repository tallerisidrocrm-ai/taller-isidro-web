import { businessConfig } from '../config';

export default function TopBar() {
    return (
        <div className="top-bar" style={{ backgroundColor: '#000', padding: '10px 0', borderBottom: '1px solid #333' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#ccc' }}>
                <p>“Si tiene ruedas, lo arreglamos”  |  Abierto {businessConfig.hours[0].day} {businessConfig.hours[0].time}</p>
                <a href={`tel:${businessConfig.phone}`} style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Llamanos: {businessConfig.phone}</a>
            </div>
        </div>
    );
}
