import PageContainer from '@/components/layout/PageContainer';
import Headings from '@/components/typography/headings';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const DashboardPage = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Headings
            title="Welcome to Dashboard"
            description="Below you can find all the necessary information to get started with the application."
          />
        </div>
        <Separator />

        {/* Dito ang list ng tables */}
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
