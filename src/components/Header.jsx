import { businessConfig } from '../config';
import './Header.css';

export default function Header() {
    return (
        <header className="header-wrapper">
            <div className="container header-container">
                <div className="logo header-logo">
                    {businessConfig.name.split(' ')[0]} <span>{businessConfig.name.split(' ').slice(1).join(' ')}</span>
                </div>
                <nav>
                    <ul className="nav-menu-list">
                        <li><a href="#home" className="nav-link" style={{ color: 'var(--accent-color)' }}>Inicio</a></li>
                        <li><a href="#about" className="nav-link">Nosotros</a></li>
                        <li><a href="#services" className="nav-link">Servicios</a></li>
                        <li><a href="#blog" className="nav-link">Blog</a></li>
                        <li><a href="#contact" className="nav-link">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
