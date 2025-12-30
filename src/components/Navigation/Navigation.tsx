import React, { useState } from 'react';
import styles from './Navigation.module.css';
import { Home, LayoutGrid, Zap, Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'devices', icon: LayoutGrid, label: 'Devices' },
    { id: 'automations', icon: Zap, label: 'Flow' },
    { id: 'notifications', icon: Bell, label: 'Updates' },
    { id: 'settings', icon: Settings, label: 'More' },
];

export const Navigation: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <nav className={styles.navigation}>
            <div className={styles.navContainer}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={clsx(styles.navItem, activeTab === item.id && styles.navItemActive)}
                        onClick={() => setActiveTab(item.id)}
                        title={item.label}
                    >
                        <item.icon size={24} strokeWidth={2.5} />
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="navBubble"
                                className={styles.bubble}
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
};
