import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (isAuthenticated) {
        // Pass a dummy onClose to Dashboard if it expects one, or modify Dashboard to not need it
        // Since Dashboard was designed as a modal, we might want to tweak its CSS or wrapper
        // But for now, let's render it directly.
        return (
            <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
                <AdminDashboard onClose={() => { }} />
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <AdminLogin onLogin={handleLogin} onClose={() => { }} />
            </div>
        </div>
    );
};

export default AdminPage;
