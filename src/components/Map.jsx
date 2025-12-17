export default function Map() {
    return (
        <section style={{
            width: '100%',
            height: '600px',
            backgroundColor: '#000',
            position: 'relative',
            zIndex: 1,
            display: 'block'
        }}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.4468893616213!2d-58.53856432574472!3d-34.466185850245346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb01eb92bb0e5%3A0x618e1a4d97ab813e!2sTalleres%20Isidro!5e0!3m2!1ses-419!2sar!4v1765761825459!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Taller Isidro"
            />
        </section>
    );
}
