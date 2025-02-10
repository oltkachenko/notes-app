'use client';

import React, { useEffect, useState } from 'react'

export default function OfflineMode() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const handleOfflineStatus = () => setIsOffline(!navigator.onLine);
        window.addEventListener('online', handleOfflineStatus);
        window.addEventListener('offline', handleOfflineStatus);

        handleOfflineStatus();

        return () => {
            window.removeEventListener('online', handleOfflineStatus);
            window.removeEventListener('offline', handleOfflineStatus);
        };
    }, []);

    return (
        <React.Fragment>
            {isOffline && (
                <div className='bg-red-100 rounded-lg p-4 my-4 mt-0'>
                    <p className="text-red-500">You are offline. Changes will be saved locally.</p>
                </div>
            )}
        </React.Fragment>
    )
}
