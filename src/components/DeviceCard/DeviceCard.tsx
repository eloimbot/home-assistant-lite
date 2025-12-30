import React from 'react';
import styles from './DeviceCard.module.css';
import type { Device } from '../../types';
import { useHome } from '../../context/HomeContext';
import { Lightbulb, Power, Thermometer, Volume2, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const iconMap = {
    light: Lightbulb,
    switch: Power,
    climate: Thermometer,
    media: Volume2,
    sensor: Landmark,
};

export const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
    const { toggleDevice } = useHome();
    const Icon = (iconMap as any)[device.type] || Power;
    const isActive = device.state === 'on' || device.state === 'open' || (typeof device.state === 'number' && device.state > 0) || device.state === 'home';

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(styles.card, isActive && styles.cardActive)}
            onClick={() => toggleDevice(device.id)}
        >
            <div className={styles.switch}>
                <div className={clsx(styles.toggle, isActive && styles.toggleActive)}>
                    <motion.div
                        className={clsx(styles.thumb, isActive && styles.thumbActive)}
                        animate={{ x: isActive ? 14 : 0 }}
                    />
                </div>
            </div>

            <div className={clsx(styles.iconWrapper, isActive && styles.iconWrapperActive)}>
                <Icon size={28} strokeWidth={2.5} />
            </div>

            <div className={styles.info}>
                <div className={styles.name}>{device.name}</div>
                <div className={styles.status}>
                    {isActive ? 'Encendido' : 'Apagado'}
                    {device.attributes?.temp && ` • ${device.attributes.temp}°C`}
                </div>
            </div>
        </motion.div>
    );
};
