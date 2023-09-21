/* eslint-disable @next/next/no-img-element */
'use client';
import axios from 'axios';
import React from 'react';
import * as Yup from 'yup';
import maker from '@/utils/maker';
import { useFormik } from 'formik';
import Input from '@/components/input';
import { useSearchParams } from 'next/navigation';
import useLoading from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';

type State = {
  paymentScreenshot: File | null;
};

const PaymentPage = () => {
  const params = useSearchParams();
  const registration = params.get('registration');

  const router = useRouter();
  const { loading, onLoading } = useLoading();
  /**
   * Submit the form
   */
  const onSubmit = React.useCallback(
    async (value: State) => {
      try {
        onLoading(true);
        const formData = new FormData();
        const docs = {
          get paymentScreenshot() {
            return '';
          },
        };
        if (value.paymentScreenshot)
          Object.defineProperty(docs, 'paymentScreenshot', {
            value: maker(`${registration}-${value.paymentScreenshot.name}`),
            writable: false,
          });
        if (value.paymentScreenshot) {
          formData.append(docs.paymentScreenshot, value.paymentScreenshot);
        }
        console.log(docs);
        // Step 1: Upload the files
        await axios.post('/api/upload', formData);
        // Step 2: Update the registration
        if (value.paymentScreenshot) {
          const url = `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${maker(
            docs.paymentScreenshot
          )}`;
          console.log(url);
          if (!url) {
            return;
          }
          const { data } = await axios({
            method: 'PUT',
            url: `/api/registration/${registration}`,
            data: {
              paymentScreenshot: url,
            },
          });
          console.log('Payment Screenshot Uploaded', data);
          console.log('Done');
          onLoading(false);
        }
        onLoading(false);
        alert('Payment Screenshot Uploaded Successfully, Thank You!');
        router.push('/');
      } catch (error) {
        console.log(error);
        onLoading(false);
      }
    },
    [onLoading, registration, router]
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

      <form
        className="flex flex-col"
        onSubmit={handleSubmit}
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? 'none' : 'all',
        }}
      >
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {/* <p className="text-lg text-center text-gray-500 dark:text-gray-400">
        Do you want to register for the next batch?{' '}
        <Link
          href={'/registration'}
          className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Register now
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </p> */}
    </main>
  );
};

export default PaymentPage;
