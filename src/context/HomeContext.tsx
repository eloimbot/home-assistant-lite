import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    createConnection,
    createLongLivedTokenAuth,
    subscribeEntities,
    callService
} from 'home-assistant-js-websocket';
import type { Connection, HassEntities } from 'home-assistant-js-websocket';
import type { Device, Scene, Room } from '../types';

interface HomeContextType {
    entities: HassEntities;
    devices: Device[];
    scenes: Scene[];
    rooms: Room[];
    isConnected: boolean;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    activeSection: string;
    setActiveSection: (id: string) => void;
    toggleDevice: (entityId: string) => void;
    activateScene: (entityId: string) => void;
    connect: (url: string, token: string) => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [entities, setEntities] = useState<HassEntities>({});
    const [isConnected, setIsConnected] = useState(false);
    const [connection, setConnection] = useState<Connection | null>(null);
    const [theme, setThemeState] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (t: 'light' | 'dark') => setThemeState(t);

    const connect = async (url: string, token: string) => {
        try {
            const auth = createLongLivedTokenAuth(url, token);
            const conn = await createConnection({ auth });
            setConnection(conn);
            setIsConnected(true);

            subscribeEntities(conn, (entities) => {
                setEntities(entities);
            });

            conn.addEventListener('disconnected', () => setIsConnected(false));
            conn.addEventListener('reconnect-error', () => setIsConnected(false));
        } catch (err) {
            console.error('Connection failed:', err);
            throw err;
        }
    };

    const toggleDevice = (entityId: string) => {
        if (!connection) return;
        const domain = entityId.split('.')[0];
        callService(connection, domain, 'toggle', { entity_id: entityId });
    };

    const activateScene = (entityId: string) => {
        if (!connection) return;
        callService(connection, 'scene', 'turn_on', { entity_id: entityId });
    };

    const mockScenes: Scene[] = [
        { id: 'scene.evening', name: 'Noche', icon: 'Moon', active: false },
        { id: 'scene.morning', name: 'Mañana', icon: 'Sun', active: true },
    ];

    const devices: Device[] = Object.keys(entities)
        .filter(id => id.startsWith('light.') || id.startsWith('switch.') || id.startsWith('climate.'))
        .map(id => ({
            id,
            name: entities[id].attributes.friendly_name || id,
            type: id.split('.')[0] as any,
            room: 'Casa',
            state: entities[id].state,
            attributes: entities[id].attributes
        }));

    return (
        <HomeContext.Provider value={{
            entities,
            devices: isConnected ? devices : [],
            scenes: mockScenes,
            rooms: [],
            isConnected,
            theme,
            setTheme,
            activeSection,
            setActiveSection,
            toggleDevice,
            activateScene,
            connect
        }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => {
    const context = useContext(HomeContext);
    if (!context) throw new Error('useHome must be used within HomeProvider');
    return context;
};
