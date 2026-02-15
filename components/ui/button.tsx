import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'mythic';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-black uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50",
                    {
                        'bg-white text-black hover:bg-zinc-200': variant === 'primary',
                        'bg-white/5 border border-white/10 text-white hover:bg-white/10': variant === 'secondary',
                        'bg-transparent text-zinc-500 hover:text-white hover:bg-white/5': variant === 'ghost',
                        'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]': variant === 'mythic',
                        'px-4 py-2 text-[8px]': size === 'sm',
                        'px-6 py-3 text-[10px]': size === 'md',
                        'px-8 py-4 text-xs': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
export const ActionButton = Button;
