import { Link } from 'react-router-dom';
import { businessConfig } from '../config';
import './Header.css';

export default function Header() {
    return (
        <header className="header-wrapper">
            <div className="container header-container">
                <div className="logo header-logo">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {businessConfig.name.split(' ')[0]} <span>{businessConfig.name.split(' ').slice(1).join(' ')}</span>
                    </Link>
                </div>
                <nav>
                    <ul className="nav-menu-list">
                        <li><Link to="/" className="nav-link">Inicio</Link></li>
                        <li><a href="/#about" className="nav-link">Nosotros</a></li>
                        <li><a href="/#services" className="nav-link">Servicios</a></li>
                        <li><a href="/#blog" className="nav-link">Blog</a></li>
                        <li><a href="/#contact" className="nav-link">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
