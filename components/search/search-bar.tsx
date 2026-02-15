import React from 'react';
import { Input } from '@/components/ui/input';

export const SearchBar = () => {
    return (
        <div className="relative w-full max-w-xl">
            <Input
                placeholder="Search the universe..."
                className="pl-12 bg-white/5 border-white/10 rounded-2xl h-14"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-black italic text-xs">/</div>
        </div>
    );
};
