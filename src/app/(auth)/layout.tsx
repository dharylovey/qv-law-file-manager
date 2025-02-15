import HomeNav from '@/components/layout/HomeNav';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeNav />
      {children}
    </div>
  );
};

export default HomeLayout;
