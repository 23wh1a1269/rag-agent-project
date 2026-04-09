import React from 'react';
import { Bot, FileText, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/** Dreamstime preview: `public/home-background.jpg` — https://thumbs.dreamstime.com/b/conversation-icon-abstract-blue-background-illustration-digital-texture-design-concept-dark-grunge-elegant-paint-modern-162452696.jpg */
const HOME_BACKGROUND_URL = `${import.meta.env.BASE_URL}home-background.jpg`;

const Home = ({ onStart }) => {
    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            isolation: 'isolate',
        }}>
            <div
                aria-hidden
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: `url(${HOME_BACKGROUND_URL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div
                aria-hidden
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    background:
                        'linear-gradient(105deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.65) 45%, rgba(15, 23, 42, 0.55) 70%, rgba(15, 23, 42, 0.82) 100%)',
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', paddingTop: '6rem', paddingBottom: '2rem' }}>

                <header style={{ 
                    padding: '1.5rem 0', 
                    position: 'fixed', 
                    top: 0, 
                    width: '100%', 
                    maxWidth: '1200px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    backdropFilter: 'blur(20px)', 
                    background: 'rgba(15, 23, 42, 0.5)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    zIndex: 100
                }}>
                    <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '0.5rem',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Bot size={28} color="white" />
                        </div>
                        RAG.Agent
                    </div>
                    <button
                        onClick={onStart}
                        className="glass"
                        style={{ 
                            padding: '0.75rem 2rem', 
                            borderRadius: '10px', 
                            fontWeight: '600', 
                            transition: 'all 0.3s', 
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#a5b4fc'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                        }}
                    >
                        Launch App
                    </button>
                </header>

                <main style={{ marginTop: '2rem' }}>
                    <section style={{ textAlign: 'center', marginBottom: '3rem', padding: '1rem 0' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ 
                                display: 'inline-block',
                                padding: '0.5rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.15)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50px',
                                marginBottom: '2rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#ffffff'
                            }}
                        >
                            ✨ Powered by Llama 3 & Vector Search
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ 
                                fontSize: '4rem', 
                                lineHeight: 1.1, 
                                marginBottom: '1.5rem', 
                                fontWeight: '900', 
                                textShadow: '0 2px 20px rgba(0,0,0,0.3)', 
                                letterSpacing: '-0.02em',
                                color: '#ffffff'
                            }}
                        >
                            <span style={{ color: '#ffffff' }}>Transform Your</span> <br />
                            <span style={{ 
                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fde047 100%)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent',
                                position: 'relative',
                                display: 'inline-block',
                                fontWeight: '900'
                            }}>
                                Documents
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    left: '0',
                                    width: '100%',
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                                    borderRadius: '2px',
                                    opacity: 0.8
                                }}></span>
                            </span> <span style={{ color: '#ffffff' }}>into Insights</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.7', fontWeight: '400' }}
                        >
                            Upload PDFs and get instant, AI-powered answers. 
                            <br />Built with enterprise-grade RAG technology.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button
                                onClick={onStart}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '1.5rem 4rem',
                                    borderRadius: '14px',
                                    fontSize: '1.2rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-4px) scale(1.02)';
                                    e.target.style.boxShadow = '0 25px 70px rgba(99, 102, 241, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.2) inset';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                    e.target.style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
                                }}
                            >
                                Launch App Now <ArrowRight size={24} />
                            </button>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{ 
                                marginTop: '1.5rem', 
                                fontSize: '0.9rem', 
                                color: 'rgba(148, 163, 184, 0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Shield size={16} /> No credit card required • Free forever
                        </motion.p>
                    </section>

                    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <FeatureCard
                            icon={<FileText color="#1e40af" size={28} />}
                            title="Smart PDF Processing"
                            description="Advanced chunking and embedding pipeline handles documents of any size with precision."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Zap color="#d97706" size={28} />}
                            title="Lightning Fast Search"
                            description="Vector similarity search delivers relevant context in milliseconds, not minutes."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Bot color="#7c3aed" size={28} />}
                            title="AI-Powered Answers"
                            description="Groq-accelerated Llama 3 generates accurate, contextual responses instantly."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Shield color="#059669" size={28} />}
                            title="Private & Secure"
                            description="Your documents never leave your infrastructure. Complete data sovereignty."
                            delay={0.3}
                        />
                    </section>
                </main>

                <footer style={{ marginTop: '3rem', padding: '1.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: 'rgba(148, 163, 184, 0.6)', fontSize: '0.9rem' }}>
                    <p>© 2026 RAG.Agent • Built with FastAPI, React & Qdrant</p>
                </footer>
            </div>
        </div>
    );
};


const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div 
        className="glass-card" 
        style={{ 
            padding: '2rem', 
            transition: 'all 0.3s', 
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(30, 64, 175, 0.2)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
        }}
        whileHover={{ 
            scale: 1.03, 
            y: -8,
            boxShadow: '0 20px 60px rgba(30, 64, 175, 0.2)',
            border: '1px solid rgba(30, 64, 175, 0.4)'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
    >
        <div style={{ 
            marginBottom: '1.25rem', 
            padding: '0.75rem',
            background: 'rgba(30, 64, 175, 0.1)',
            borderRadius: '12px',
            display: 'inline-block'
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>{title}</h3>
        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
);

export default Home;
