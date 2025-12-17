import React from 'react';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Marisa Malarchia",
            rating: 5,
            comment: "Súper, contenta con el trabajo que hicieron en el taller, muy atentos todos, y el trabajo quedó impecable! Gracias"
        },
        {
            name: "Agustin Castillo",
            rating: 5,
            comment: "Un diez de diez, siempre le llevo mis autos. Muy responsables, muy dispuestos a solucionar los problemas. No te dejan tirado, no te van con chamullos raros, tienen varios talleres uno donde hacen chapa, otro donde hacen mecánica y te atienden bien."
        },
        {
            name: "Facundo Bastian",
            rating: 5,
            comment: "Impecable lugar, y la atención trabajo muy capacitado 100% recomendable."
        },
        {
            name: "María Inés Villola",
            rating: 5,
            comment: "Excelente atención y servicio"
        },
        {
            name: "Carlos W Miranda",
            rating: 5,
            comment: "Excelente taller y calidad humana.-"
        },
        {
            name: "Teresa Kempter",
            rating: 5,
            comment: "Muy buen taller de mecánica, chapa y pintura"
        }
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="section-padding" style={{ backgroundColor: '#0a0a0a', textAlign: 'center' }}>
            <div className="container">
                <span className="section-title-small">Testimonios</span>
                <h2 className="section-title-large" style={{ marginBottom: '60px' }}>Lo Que Dicen Nuestros Clientes</h2>

                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    {/* Google Widget Header Style */}
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '15px 20px',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        borderBottom: '1px solid #eee'
                    }}>
                        <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>Excelente</span>
                        <div style={{ display: 'flex' }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{ color: '#f4c150', fontSize: '1.2rem' }}>★</span>
                            ))}
                        </div>
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>En base a 29 reseñas</span>
                        <div style={{ width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', padding: '2px', marginLeft: '10px' }}>
                            <svg viewBox="0 0 24 24" style={{ display: 'block', width: '100%', height: '100%' }}>
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '40px',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                        minHeight: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {/* Stars */}
                        <div style={{ marginBottom: '20px' }}>
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <span key={i} style={{ color: 'var(--accent-color)', fontSize: '1.5rem', marginRight: '5px' }}>★</span>
                            ))}
                        </div>

                        {/* Comment */}
                        <p style={{
                            fontSize: '1.2rem',
                            fontStyle: 'italic',
                            color: '#ddd',
                            marginBottom: '30px',
                            lineHeight: '1.6'
                        }}>
                            "{testimonials[currentIndex].comment}"
                        </p>

                        {/* Client Name */}
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: 'var(--accent-color)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            {testimonials[currentIndex].name}
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'var(--accent-color)',
                            border: 'none',
                            color: '#000',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ‹
                    </button>
                    <button
                        onClick={nextTestimonial}
                        style={{
                            position: 'absolute',
                            right: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'var(--accent-color)',
                            border: 'none',
                            color: '#000',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ›
                    </button>

                    {/* Dots Indicator */}
                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: index === currentIndex ? 'var(--accent-color)' : '#333',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
