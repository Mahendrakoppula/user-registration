import Input from "@/components/input";
import React from "react";

const PaymentPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="flex flex-col items-center max-w-lg">
        <img
          className="rounded-lg h-2/4 w-2/4"
          src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          alt="image description"
        />
        <figcaption className="mt-2 text-base text-center text-gray-500 dark:text-gray-400">
          Scan the QR Code for payment
        </figcaption>
      </figure>

      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          then
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="Upload Screenshot of Payment"
          id="user_avatar"
          type="file"
        />
        <div
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="user_avatar_help"
        >
          PNG, JPG, GIF up to 10MB
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default PaymentPage;
