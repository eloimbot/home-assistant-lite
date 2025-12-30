import React, { ReactNode, useState } from 'react';
import styles from './Layout.module.css';
import { Sidebar } from './Navigation/Sidebar';
import { TopBar } from './Navigation/TopBar';
import { Navigation } from './Navigation/Navigation';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [activeId, setActiveId] = useState('home');

    return (
        <div className={styles.layout}>
            <Sidebar activeId={activeId} onSelect={setActiveId} />

            <main className={styles.mainContent}>
                <TopBar />
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </main>

            {/* Solo visible en móviles */}
            <Navigation />
        </div>
    );
};
