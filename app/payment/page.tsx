import React from "react";

const PaymentPage = () => {
  return     <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <div>
        <img  src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" width={200} height={200} alt="" />
        <p>scan the qr code for payment</p> 
        
    </div>
    <div>
        <div>
            <p>Upload the screenshot </p>
        </div>
    <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            10th certificate
          </label>
          <input
            type="file"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
    
    </div>
</main>
};

export default PaymentPage;
