import React from 'react';
import styles from './Dashboard.module.css';
import { useHome } from '../../context/HomeContext';
import { DeviceCard } from '../DeviceCard/DeviceCard';
import { SceneCard } from '../SceneCard/SceneCard';
import { motion } from 'framer-motion';
import { Cloud, Thermometer, ShieldCheck } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { devices, scenes } = useHome();

    return (
        <div className={styles.dashboard}>
            <header className={styles.hero}>
                <div className={styles.avatarArea}>
                    <img
                        className={styles.largeAvatar}
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User"
                    />
                </div>
                <div className={styles.greetingText}>
                    <h1>¡Buenos días, User!</h1>
                    <div className={styles.statusSummary}>
                        <div className={styles.statusItem}>
                            <Cloud size={18} />
                            <span>18°C · Parcialmente nublado</span>
                        </div>
                        <div className={styles.statusItem}>
                            <ShieldCheck size={18} color="#4CAF50" />
                            <span>Todo seguro</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Favoritos</h2>
                <div className={styles.grid}>
                    {devices.slice(0, 4).map(device => (
                        <DeviceCard key={device.id} device={device} />
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Escenas Rápidas</h2>
                <div className={styles.scenesHorizontal}>
                    {scenes.map(scene => (
                        <SceneCard key={scene.id} scene={scene} />
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Todos los Dispositivos</h2>
                <div className={styles.grid}>
                    {devices.map(device => (
                        <DeviceCard key={device.id} device={device} />
                    ))}
                </div>
            </section>
        </div>
    );
};
