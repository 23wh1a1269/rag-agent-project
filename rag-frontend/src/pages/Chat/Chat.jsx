import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Paperclip, MessageSquare, ChevronLeft, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = ({ onBack }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const fileInputRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isThinking) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            const response = await fetch('http://localhost:8000/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: input, top_k: 5 })
            });

            const data = await response.json();
            pollForResult(data.event_id);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to backend.', isError: true }]);
            setIsThinking(false);
        }
    };

    const pollForResult = async (eventId) => {
        const pollInterval = setInterval(async () => {
            try {
                const resp = await fetch(`http://localhost:8288/v1/events/${eventId}/runs`);
                const data = await resp.json();
                const runs = data.data || [];

                if (runs.length > 0) {
                    const run = runs[0];
                    if (run.status === 'Completed' || run.status === 'Succeeded') {
                        clearInterval(pollInterval);
                        const output = run.output || {};
                        setMessages(prev => [...prev, {
                            role: 'ai',
                            text: output.answer,
                            sources: output.sources
                        }]);
                        setIsThinking(false);
                    } else if (run.status === 'Failed' || run.status === 'Cancelled') {
                        clearInterval(pollInterval);
                        setMessages(prev => [...prev, { role: 'ai', text: 'Task failed.', isError: true }]);
                        setIsThinking(false);
                    }
                }
            } catch (err) {
                clearInterval(pollInterval);
                setIsThinking(false);
            }
        }, 1000);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            setMessages(prev => [...prev, { role: 'system', text: `Uploading and ingesting: ${file.name}...` }]);

            const response = await fetch('http://localhost:8000/upload', {


                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setIsUploading(false);
                setMessages(prev => [...prev, { role: 'system', text: `Ingestion triggered for ${file.name}. It will be ready in a moment.` }]);
            } else {
                throw new Error('Upload failed');
            }

        } catch (err) {
            setMessages(prev => [...prev, { role: 'system', text: `Upload failed: ${err.message}`, isError: true }]);
            setIsUploading(false);
        }
    };


    return (
        <div className="flex-center" style={{ height: '100vh', padding: '1rem' }}>
            <div className="glass" style={{
                width: '100%',
                maxWidth: '1000px',
                height: '90vh',
                borderRadius: 'var(--radius)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={onBack} className="flex-center" style={{ color: 'var(--text-muted)', hover: { color: 'var(--text)' } }}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex-center" style={{ gap: '0.75rem' }}>
                        <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                            <MessageSquare size={20} color="white" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: '600' }}>AI Assistant</h2>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Powered by Llama 3 & Inngest</p>
                        </div>
                    </div>
                </div>

                <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.length === 0 && (
                        <div className="flex-center" style={{ height: '100%', flexDirection: 'column', color: 'var(--text-muted)', textAlign: 'center' }}>
                            <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ fontSize: '1.1rem' }}>Upload a PDF to start chatting with your data.</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                            >
                                <div style={{
                                    padding: '1rem 1.25rem',
                                    borderRadius: 'var(--radius)',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
                                    color: 'white',
                                    border: msg.role === 'ai' ? '1px solid var(--border)' : 'none'
                                }}>
                                    {msg.text}
                                </div>
                                {msg.sources && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        Sources: {msg.sources.map((s, i) => <span key={i} className="glass" style={{ padding: '2px 6px', borderRadius: '4px' }}>{s}</span>)}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        {isThinking && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Loader2 size={16} className="animate-spin" />
                                <span>AI is thinking...</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem', background: 'rgba(15, 23, 42, 0.5)' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".pdf"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex-center glass"
                        style={{ width: '45px', height: '45px', borderRadius: '12px', flexShrink: 0 }}
                    >
                        <Paperclip size={20} />
                    </button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your question..."
                        style={{
                            flex: 1,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '0 1rem',
                            color: 'var(--text)',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isThinking}
                        className="flex-center"
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            background: 'var(--primary)',
                            color: 'white',
                            opacity: isThinking ? 0.5 : 1
                        }}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
