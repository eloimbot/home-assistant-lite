import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import { useHome } from '../context/HomeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthModal: React.FC = () => {
    const { connect, isConnected } = useHome();
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Intentar conectar con valores guardados si existen
    useState(() => {
        const savedUrl = localStorage.getItem('ha_url');
        const savedToken = localStorage.getItem('ha_token');
        if (savedUrl && savedToken && !isConnected) {
            connect(savedUrl, savedToken).catch(() => { });
        }
    });

    const handleConnect = async () => {
        setLoading(true);
        setError('');
        try {
            await connect(url, token);
            localStorage.setItem('ha_url', url);
            localStorage.setItem('ha_token', token);
        } catch (err) {
            setError('Error al conectar. Verifica la URL y el Token.');
        } finally {
            setLoading(false);
        }
    };

    if (isConnected) return null;

    return (
        <div className={styles.modalOverlay}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={styles.modal}
            >
                <h2 className={styles.title}>Conectar Home Assistant</h2>
                <p>Introduce los datos para sincronizar tus dispositivos.</p>

                <div className={styles.field}>
                    <label>URL de Home Assistant</label>
                    <input
                        type="text"
                        placeholder="http://homeassistant.local:8123"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label>Token de Acceso de Larga Duración</label>
                    <input
                        type="password"
                        placeholder="Escribe tu token aquí..."
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>

                {error && <div className={styles.status}>{error}</div>}

                <button
                    className={styles.button}
                    onClick={handleConnect}
                    disabled={loading}
                >
                    {loading ? 'Conectando...' : 'Establecer Conexión'}
                </button>
            </motion.div>
        </div>
    );
};
