export const dynamic = 'force-dynamic';

import React from 'react';
import UserDataTable from '@/components/table/user-data';

async function getRegistration(id: string) {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/registration/${id}`
    );
    const json = await data.json();
    return json?.response;
  } catch (error) {
    console.error(error);
  }
}

type HomeProps = {
  params: {
    registration: string;
  };
};

export default async function Home({ params }: HomeProps) {
  const state = await getRegistration(params.registration as string);
  return (
    <React.Fragment>
      <div className="flex  items-center justify-center h-32">
        <h1 className="text-center mb-4 text-2xl  text-gray-900  md:text-4xl lg:text-5xl">
          <span className=" text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {params.registration}
          </span>{' '}
        </h1>
      </div>

      <UserDataTable state={state} />
    </React.Fragment>
  );
}
