import React from 'react';
import { Panel } from '@/components/ui/panel';

export const NotificationToast = ({ title, message }: { title: string, message: string }) => {
    return (
        <Panel className="fixed bottom-8 right-8 w-80 p-4 border-l-4 border-l-white bg-black/90 shadow-2xl animate-in slide-in-from-right duration-500">
            <h4 className="text-xs font-black uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-[10px] text-zinc-400 font-medium">{message}</p>
        </Panel>
    );
};
