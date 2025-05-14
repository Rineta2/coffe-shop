"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

interface InitialLoadingContextType {
    isInitialLoading: boolean;
    setIsInitialLoading: (loading: boolean) => void;
    progress: number;
    setProgress: (progress: number) => void;
}

const InitialLoadingContext = createContext<InitialLoadingContextType | undefined>(undefined);

export function InitialLoadingProvider({ children }: { children: React.ReactNode }) {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isInitialLoading) return;
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsInitialLoading(false);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);
        return () => clearInterval(interval);
    }, [isInitialLoading]);

    return (
        <InitialLoadingContext.Provider value={{
            isInitialLoading,
            setIsInitialLoading,
            progress,
            setProgress
        }}>
            <AnimatePresence>
                {isInitialLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999999] flex items-center justify-center bg-[var(--primary)]"
                    >
                        <div className="relative flex items-center justify-center flex-col">
                            {/* Coffee Cup Animation */}
                            <motion.div
                                className="w-32 h-32 relative"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="w-full h-full text-[var(--title)]"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <motion.path
                                        d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h13v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            duration: 2,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                        }}
                                    />
                                    <motion.path
                                        d="M6 2v2M10 2v2M14 2v2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            duration: 2,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                        }}
                                    />
                                    <motion.path
                                        d="M6 12h.01M10 12h.01M14 12h.01"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            duration: 2,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                        }}
                                    />
                                </svg>
                            </motion.div>

                            {/* Progress Text */}
                            <motion.div
                                className="mt-8 text-[var(--secondary)] text-4xl font-bold text-center tracking-wider"
                                animate={{
                                    opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {progress}%
                            </motion.div>

                            {/* Loading Text */}
                            <motion.div
                                className="mt-2 text-[var(--secondary)]/80 text-lg font-medium text-center"
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Preparing your coffee experience...
                            </motion.div>

                            {/* Modern Loading Bar */}
                            <motion.div
                                className="mt-6 w-48 h-1.5 bg-[var(--secondary)]/10 rounded-full overflow-hidden backdrop-blur-sm"
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[var(--title)] to-[#FF6B6B]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!isInitialLoading && children}
        </InitialLoadingContext.Provider>
    );
}

export function useInitialLoading() {
    const context = useContext(InitialLoadingContext);
    if (context === undefined) {
        throw new Error('useInitialLoading must be used within an InitialLoadingProvider');
    }
    return context;
} 