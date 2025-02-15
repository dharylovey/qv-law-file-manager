import PageContainer from '@/components/layout/PageContainer';
import Headings from '@/components/typography/headings';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const FileManagerPage = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Headings title="File Manager" description="Manage your files here." />
        </div>
        <Separator />

        {/* Dito ang list ng tables */}
      </div>
    </PageContainer>
  );
};

export default FileManagerPage;
