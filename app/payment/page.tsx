/* eslint-disable @next/next/no-img-element */
'use client';
import Input from '@/components/input';
import maker from '@/utils/maker';
import axios from 'axios';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';

type State = {
  paymentScreenshot: File | null;
};

const PaymentPage = () => {
  const params = useSearchParams();
  const registration = params.get('registration');
  /**
   * Submit the form
   */
  const onSubmit = React.useCallback(
    async (value: State) => {
      const formData = new FormData();
      let docs = {
        paymentScreenshot: '',
      };
      if (value.paymentScreenshot) {
        docs.paymentScreenshot = `${registration}-${value.paymentScreenshot.name}`;
        formData.append(docs.paymentScreenshot, value.paymentScreenshot);
      }
      // Step 1: Upload the files
      await axios.post('/api/upload', formData);
      // Step 2: Update the registration
      if (value.paymentScreenshot) {
        const url = maker(docs.paymentScreenshot) || null;
        const { data } = await axios({
          method: 'PUT',
          url: `/api/registration/${registration}`,
          data: {
            paymentScreenshot: url,
          },
        });
        console.log(data);
      }
    },
    [registration]
  );
  /**
   * Formik
   */
  const { errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      paymentScreenshot: null as File | null,
    },
    onSubmit,
    validationSchema: Yup.object().shape({
      paymentScreenshot: Yup.mixed().required('Required'),
    }),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="flex flex-col items-center max-w-lg">
        <img
          className="rounded-lg h-2/4 w-2/4"
          src={'/qr-codes/phone-pay.jpg'}
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

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          label="Upload Screenshot of Payment"
          id="user_avatar"
          type="file"
          name="paymentScreenshot"
          onChange={({ target }) => {
            if (target.files) {
              setFieldValue(target.name, target.files[0]);
            }
          }}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          caption="PNG, JPG, WEBP up to 1MB"
        />
        {errors.paymentScreenshot && (
          <div className="text-red-500">{errors.paymentScreenshot}</div>
        )}

        <button
          type="submit"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default PaymentPage;
