'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { tracker } from '@/lib/tracking/client';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ForensicErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        tracker.track('app_error', {
            code: 'FORENSIC_ERROR_BOUNDARY',
            component: 'AppRoot',
            message_hash: error.message, // Ideally hashed, simplified for now
        });
        console.error('Forensic Error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.children; // Fail gracefully, don't break app, just log
        }

        return this.props.children;
    }
}
