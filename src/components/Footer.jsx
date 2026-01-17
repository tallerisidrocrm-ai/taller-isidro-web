import { businessConfig } from '../config';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="container footer-container">
                <div className="footer-grid">
                    <div style={{ gridColumn: 'span 1' }}>
                        <div className="footer-brand">
                            {businessConfig.name.split(' ')[0]} <span>{businessConfig.name.split(' ').slice(1).join(' ')}</span>
                        </div>
                        <p className="footer-description">
                            {businessConfig.description.split('.')[0]}.
                        </p>
                        <div className="footer-address">
                            📍 {businessConfig.address.split(',')[0]} <br />
                            {businessConfig.locationDetail}
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <h4 className="footer-heading">Nuestros Servicios</h4>
                        <ul className="footer-list">
                            {businessConfig.services.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <h4 className="footer-heading">Horarios</h4>
                        <ul className="footer-list">
                            {businessConfig.hours.map((hour, index) => (
                                <li key={index}>{hour.day}: {hour.time}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <h4 className="footer-heading">Llamanos</h4>
                        <div className="footer-phone">
                            {businessConfig.phone}
                        </div>
                        <button
                            onClick={() => window.open(`https://wa.me/${businessConfig.whatsappNumber}`, '_blank')}
                            className="btn btn-primary footer-cta-btn"
                        >
                            Solicitar Presupuesto
                        </button>
                    </div>
                </div>
            </div>

            <div className="container footer-copyright">
                &copy; {new Date().getFullYear()} {businessConfig.name}. Todos los derechos reservados.
            </div>
        </footer>
    );
}
