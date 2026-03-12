import React, { useState, useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './CRMChat.css';

const CRMChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatInitialized = useRef(false);

    useEffect(() => {
        if (chatInitialized.current) return;
        chatInitialized.current = true;
        try {
            createChat({
                webhookUrl: 'https://tallerisidro-n8n.6shxj1.easypanel.host/webhook/a9a59773-0ba4-401c-8643-95ea14e488d7/chat',
                target: '#custom-n8n-crm-wrapper',
                mode: 'fullscreen',
                i18n: {
                    en: {
                        title: '¡Hola! 👋',
                        subtitle: 'Iniciá un chat. Estamos aquí para ayudarte 24/7.',
                        getStarted: 'Nuevo Chat',
                        inputPlaceholder: 'Escribí un mensaje...'
                    }
                }
            });
        } catch (e) {
            console.error("No se pudo inicializar n8n chat:", e);
        }
    }, []);

    return (
        <>
            {/* Botón flotante CRM */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`crm-floating-button ${isChatOpen ? 'active' : ''}`}
                title="Hablar con CRM"
                style={{ 
                    zIndex: isChatOpen ? 3001 : 1000 
                }}
            >
                <div className="crm-icon">
                    {isChatOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    )}
                </div>
                <span>{isChatOpen ? 'Cerrar Chat' : 'Chat CRM'}</span>
            </button>

            {/* Ventana de Chat CRM */}
            <div className={`crm-chat-container ${isChatOpen ? 'visible' : 'hidden'}`} style={{ zIndex: 3000 }}>
                <div className="crm-chat-window" style={{ background: '#fff' }}>
                    <div className="chat-header-bar" style={{
                        padding: '10px 15px',
                        background: '#2196F3',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Asistente CRM Isidro</span>
                        <button onClick={() => setIsChatOpen(false)} style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '1.2rem'
                        }}>&times;</button>
                    </div>
                    <div id="custom-n8n-crm-wrapper" style={{ width: '100%', height: 'calc(100% - 40px)' }}></div>
                </div>
            </div>
        </>
    );
};

export default CRMChat;
