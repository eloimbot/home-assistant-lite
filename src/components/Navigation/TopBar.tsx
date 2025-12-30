import React from 'react';
import styles from './TopBar.module.css';
import { Search, Plus, Bell, Moon, Sun, UserPlus } from 'lucide-react';
import { useHome } from '../../context/HomeContext';

export const TopBar: React.FC = () => {
    const { theme, setTheme } = useHome();

    return (
        <header className={styles.topBar}>
            <div className={styles.left}>
                <div className={styles.search}>
                    <Search size={18} />
                    <input type="text" placeholder="Buscar dispositivos, Flows..." />
                </div>
            </div>

            <div className={styles.right}>
                <button className={styles.addButton} title="Añadir dispositivo">
                    <Plus size={24} />
                </button>
                <button className={styles.iconButton} title="Añadir usuario">
                    <UserPlus size={20} />
                </button>
                <button className={styles.iconButton} title="Notificaciones">
                    <Bell size={20} />
                    <div className={styles.badge} />
                </button>
                <button
                    className={styles.iconButton}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    title="Cambiar tema"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <div className={styles.avatar}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
            </div>
        </header>
    );
};
