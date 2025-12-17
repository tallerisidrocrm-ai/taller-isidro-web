import { useState } from 'react';

export default function Header() {
    return (
        <header style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(26, 26, 26, 0.7)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo" style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff' }}>
                    TALLER <span style={{ color: 'var(--accent-color)' }}>ISIDRO</span>
                </div>
                <nav>
                    <ul className="nav-menu" style={{ display: 'flex', listStyle: 'none', gap: '30px', fontWeight: '600' }}>
                        <li><a href="#home" style={{ color: 'var(--accent-color)' }}>Inicio</a></li>
                        <li><a href="#about">Nosotros</a></li>
                        <li><a href="#services">Servicios</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
