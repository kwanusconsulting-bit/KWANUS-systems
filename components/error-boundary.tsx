"use client";

import React, { Component, ReactNode } from "react";
import { logger } from "@/lib/utils/logger";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        logger.error("React Error Boundary caught an error", {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack
        });
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="k-card rounded-2xl p-8 max-w-lg text-center">
                        <div className="text-2xl font-semibold mb-2 text-red-400">System Error</div>
                        <p className="text-sm text-white/60 mb-4">
                            The KWANUS OS encountered an unexpected error. Please refresh the page.
                        </p>
                        <button
                            className="k-button-primary px-6 py-2 rounded-xl"
                            onClick={() => window.location.reload()}
                        >
                            Reload System
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
