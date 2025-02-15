import React, { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const PageContainer = ({
  children,
  scrollable = true,
}: {
  children: ReactNode;
  scrollable?: boolean;
}) => {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-full w-full">
          <div className="flex flex-1 p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="flex flex-1 p-4 md:px-6">{children}</div>
      )}
    </>
  );
};

export default PageContainer;
