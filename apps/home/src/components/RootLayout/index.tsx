import { Navbar } from '@mfe/shared/components';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar title='mfe.demo' />
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
