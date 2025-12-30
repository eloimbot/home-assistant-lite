import React from 'react';
import styles from './SceneCard.module.css';
import type { Scene } from '../../types';
import { useHome } from '../../context/HomeContext';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const SceneCard: React.FC<{ scene: Scene }> = ({ scene }) => {
    const { activateScene } = useHome();
    // @ts-ignore
    const Icon = (Icons as any)[scene.icon] || Icons.Zap;

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(styles.sceneCard, scene.active && styles.sceneCardActive)}
            onClick={() => activateScene(scene.id)}
        >
            <Icon size={18} />
            <span>{scene.name}</span>
        </motion.button>
    );
};
