import React, { useState, useEffect, useRef } from 'react';
import './CRMChat.css';

// Webhook de n8n para Chat (FORZADO relativo para seguridad y proxy)
const WEBHOOK_URL = '/webhook/a9a59773-0ba4-401c-8643-95ea14e488d7/chat';

const SESSION_ID = 'crm-session-' + crypto.randomUUID();

const CRMChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: '¡Hola! 👋 Soy el asistente del Taller Isidro. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (isChatOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isChatOpen]);

    // PROTECCIÓN EXTRA: Solo renderizar si estamos seguros de que es estadísticas
    const isStatsDomain = window.location.hostname.includes('estadisticas');
    const isStatsPath = window.location.pathname.startsWith('/estadisticas');
    if (!isStatsDomain && !isStatsPath) return null;


    const parseNDJSON = (text) => {
        const lines = text.split('\n').filter(l => l.trim());
        let result = '';
        let hasError = false;
        for (const line of lines) {
            try {
                const obj = JSON.parse(line);
                if (obj.type === 'item' && obj.content) {
                    result += obj.content;
                } else if (obj.type === 'error') {
                    hasError = true;
                } else if (obj.output !== undefined) {
                    result = obj.output;
                }
            } catch {
                if (!result && line && !line.startsWith('{')) {
                    result += line;
                }
            }
        }
        if (hasError && !result) {
            return '__ERROR__';
        }
        return result.trim();
    };

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
        setInput('');
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_API_KEY || 'tis-k8x7m2p4q9w1n6v3j5';
            const headers = { 'Content-Type': 'application/json' };
            
            // Verificamos si la API Key existe
            if (apiKey) {
                // btoa en navegadores modernos maneja strings ASCII. 
                // Aseguramos el formato correcto user:pass
                const authHeader = btoa(`tallerisidro:${apiKey}`);
                headers['Authorization'] = `Basic ${authHeader}`;
            }

            if (import.meta.env.DEV || true) {
                console.log('--- DEBUG CHAT ---');
                console.log('URL:', WEBHOOK_URL);
                console.log('Headers Keys:', Object.keys(headers));
                console.log('Auth Present:', !!headers['Authorization']);
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    action: 'sendMessage',
                    chatInput: trimmed,
                    sessionId: SESSION_ID,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('API Error Response:', response.status, errorBody);
                throw new Error(`HTTP ${response.status}: ${errorBody.substring(0, 50)}`);
            }

            const contentType = response.headers.get('content-type') || '';
            let botText = '';

            if (contentType.includes('text/event-stream') || contentType.includes('application/x-ndjson')) {
                // Streaming: read chunks as they arrive
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                // Add placeholder message
                setMessages(prev => [...prev, { role: 'bot', text: '' }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });
                    const parsed = parseNDJSON(buffer);
                    if (parsed) {
                        setMessages(prev => {
                            const updated = [...prev];
                            updated[updated.length - 1] = { role: 'bot', text: parsed };
                            return updated;
                        });
                    }
                }
                // Final parse of full buffer
                botText = parseNDJSON(buffer);
                const finalText = botText === '__ERROR__'
                    ? '⚠️ El asistente tuvo un problema interno. Por favor intentá de nuevo.'
                    : (botText || 'Sin respuesta.');
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'bot', text: finalText };
                    return updated;
                });
            } else {
                // Non-streaming: parse full response
                const raw = await response.text();
                try {
                    const json = JSON.parse(raw);
                    // n8n responde a menudo como un array [{json: {output: "..."}}]
                    const data = Array.isArray(json) ? (json[0]?.json || json[0]) : json;
                    botText = data?.output || data?.text || data?.message || data?.response || JSON.stringify(data);
                } catch {
                    botText = parseNDJSON(raw) || raw;
                }
                const finalText = botText === '__ERROR__'
                    ? '⚠️ El asistente tuvo un problema interno. Por favor intentá de nuevo.'
                    : (botText || 'Sin respuesta.');
                setMessages(prev => [...prev, { role: 'bot', text: finalText }]);
            }
        } catch (err) {
            console.error('CRITICAL CHAT ERROR:', err);
            setMessages(prev => [...prev, {
                role: 'bot',
                text: `⚠️ No se pudo conectar: ${err.message}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`crm-floating-button ${isChatOpen ? 'active' : ''}`}
                title="Hablar con el Asistente"
                style={{ zIndex: isChatOpen ? 3001 : 1000 }}
            >
                <div className="crm-icon">
                    {isChatOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    )}
                </div>
                <span>{isChatOpen ? 'Cerrar' : 'Asistente'}</span>
            </button>

            {/* Ventana de chat */}
            <div className={`crm-chat-container ${isChatOpen ? 'visible' : 'hidden'}`} style={{ zIndex: 3000 }}>
                <div className="crm-chat-window">
                    {/* Header */}
                    <div className="crm-chat-header">
                        <div className="crm-header-info">
                            <div className="crm-avatar">🤖</div>
                            <div>
                                <strong>Asistente Taller Isidro</strong>
                                <span className="crm-status">● En línea</span>
                            </div>
                        </div>
                        <button className="crm-close-btn" onClick={() => setIsChatOpen(false)}>✕</button>
                    </div>

                    {/* Mensajes */}
                    <div className="crm-messages">
                        {messages.map((msg, i) => {
                            // Limpia caracteres molestos como **, *, o convierte guiones en viñetas limpias
                            const cleanedText = msg.text
                                ? msg.text.replace(/\*\*(.*?)\*\*/g, '$1')
                                          .replace(/\*(.*?)\*/g, '$1')
                                          .replace(/^-\s+/gm, '• ')
                                          .replace(/^#+\s/gm, '')
                                : '';
                            return (
                                <div key={i} className={`crm-message ${msg.role}`}>
                                    <div className="crm-bubble" style={{ whiteSpace: 'pre-wrap' }}>{cleanedText}</div>
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="crm-message bot">
                                <div className="crm-bubble crm-typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="crm-input-area">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Escribí tu consulta..."
                            disabled={isLoading}
                            className="crm-input"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className="crm-send-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CRMChat;
