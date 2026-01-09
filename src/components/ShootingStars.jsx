import React from 'react';

const ShootingStars = () => {
    return (
        <div className="shooting-stars">
            {[...Array(15)].map((_, i) => (
                <div key={i} className="star"></div>
            ))}
        </div>
    );
};

export default ShootingStars;
