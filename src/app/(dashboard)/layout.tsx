import React, { ReactNode } from 'react';

import { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Welcome to the dashboard',
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-1">
          <SidebarInset>
            <Header />
            {children}
            <Toaster position="top-center" />
          </SidebarInset>
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
