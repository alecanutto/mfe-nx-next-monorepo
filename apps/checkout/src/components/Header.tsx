import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: '#090909',
        color: 'white',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      Logo
      <ul>
        <li>Home</li>
      </ul>
    </header>
  );
};

export default Header;
