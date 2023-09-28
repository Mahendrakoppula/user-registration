import React from 'react';

const DefaultLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <main className="flex max-w-screen-md mx-auto min-h-screen flex-col p-24 gap-4 mobile:p-4 mobile:mt-8 tablet:p-6 tablet:mt-6">
      {children}
    </main>
  );
};
export default DefaultLayout;
