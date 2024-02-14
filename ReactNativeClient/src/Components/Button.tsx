import React from 'react';

const Button = ({ onClick, children, variant }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '8px 16px',
                backgroundColor: variant === 'primary' ? 'blue' : 'gray',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            {children}
        </button>
    );
};

export default Button;
