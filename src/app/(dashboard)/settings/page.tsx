import PageContainer from '@/components/layout/PageContainer';
import Headings from '@/components/typography/headings';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const SettingPage = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Headings title="Settings" description="Set your preferences here." />
        </div>
        <Separator />

        {/* Dito ang list ng tables */}
      </div>
    </PageContainer>
  );
};

export default SettingPage;
