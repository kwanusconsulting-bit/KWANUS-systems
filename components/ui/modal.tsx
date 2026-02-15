"use client"

import React from 'react';
import { Panel } from './panel';
import { Button } from './button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
            <Panel className="w-full max-w-lg border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
                <header className="flex justify-between items-center mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{title}</h3>
                    <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
                </header>
                <div className="space-y-6">
                    {children}
                </div>
            </Panel>
        </div>
    );
};
