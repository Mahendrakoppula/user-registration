import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex  items-center justify-center h-32">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Terms and
          </span>{' '}
          conditions
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4 text-lg text-gray-600 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate quod officia sequi cumque, voluptatem, quibusdam, quia
          voluptatibus quos doloribus quae. Quisquam voluptate quod officia
          sequi cumque, voluptatem, quibusdam, quia voluptatibus quos doloribus
          quae.
        </p>
        <p className="mb-4 text-lg text-gray-600 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A officiis
          quam libero quas veniam adipisci quasi non, sed architecto vero
          pariatur exercitationem maiores id, natus tempore, perspiciatis
          dolorum assumenda amet?
        </p>
      </div>
    </main>
  );
}
