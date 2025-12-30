import React from 'react';
import styles from './Sidebar.module.css';
import { Home, LayoutGrid, Zap, BarChart3, MessageSquare, Plus, Home as HomeIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'devices', icon: LayoutGrid, label: 'Dispositivos' },
    { id: 'flows', icon: Zap, label: 'Flows' },
    { id: 'insights', icon: BarChart3, label: 'Insights' },
    { id: 'logic', icon: MessageSquare, label: 'Lógica' },
];

export const Sidebar: React.FC<{ activeId: string; onSelect: (id: string) => void }> = ({ activeId, onSelect }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <HomeIcon fill="currentColor" size={28} />
                <span>Homey</span>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={clsx(styles.navItem, activeId === item.id && styles.navItemActive)}
                        onClick={() => onSelect(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                        {activeId === item.id && (
                            <motion.div
                                layoutId="sidebarActive"
                                className={styles.activeIndicator}
                            />
                        )}
                    </button>
                ))}
            </nav>
        </aside>
    );
};
