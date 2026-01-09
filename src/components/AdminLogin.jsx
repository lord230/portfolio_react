import React, { useState } from 'react';

const AdminLogin = ({ onLogin, onClose }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hardcoded credentials as requested
        if (userId === '1amit23verma' && password === 'Lord@9009') {
            onLogin();
        } else {
            setError('Invalid Admin ID or Password');
        }
    };

    return (
        <div className="admin-modal">
            <div className="admin-content login-content">
                <div className="modal-header">
                    <h2>Admin Login</h2>
                    <button className="close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Unique Admin ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="admin-input"
                            placeholder="Enter Admin ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="admin-input"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    {error && <p className="error-msg" style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
