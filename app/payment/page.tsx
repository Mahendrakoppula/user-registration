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
import CopyIcon from '@/components/icons/CopyIcon';
import CheckIcon from '@/components/icons/CheckIcon';

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
              // paymentStatus: PaymentStatus.APPORVED,
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
  // Copy to clipboard
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = (str: string) => {
    if (window) {
      setCopied(true);
      window.navigator.clipboard.writeText(str);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
        {/* Copy yoour registration code  */}
        <div className="max-w-2xl w-full px-4 py-8 space-y-4rounded-lg sm:px-6 sm:py-8 sm:space-y-6">
          <h2
            className="
            text-2xl font-medium text-gray-500 text-center sm:text-3xl
            mobile:text-xl mobile:font-semibold mobile:text-center
            tablet:text-2xl tablet:font-semibold tablet:text-center
            p-4
          "
          >
            Your Registration ID
          </h2>
          <div className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5">
            <h4>{registration}</h4>
            <div
              onClick={copyToClipboard.bind(null, registration as string)}
              className="flex items-center gap-1 text-blue-700 hover:text-blue-800 cursor-pointer"
            >
              <span>
                {copied ? (
                  <CheckIcon height={20} width={20} fill="currentColor" />
                ) : (
                  <CopyIcon height={20} width={20} fill="currentColor" />
                )}
              </span>
              {copied ? 'Copied' : 'Copy'}
            </div>
          </div>
          <figure className="flex flex-col items-center justify-center">
            <img
              className="rounded-lg w-96 h-96 mobile:w-64 mobile:h-64 tablet:w-80 tablet:h-80 object-contain"
              src={'/qr-codes/phone-pay.jpg'}
              alt="image description"
            />
            <figcaption className="mt-2 text-base text-center text-gray-500 ">
              Scan the QR Code for payment
            </figcaption>
          </figure>
          <div className="inline-flex items-center justify-center w-full">
            <hr className=" w-full  h-1 my-8 bg-gray-200 border-0 rounded " />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
              then
            </span>
          </div>
          <form
            className="flex flex-col space-y-4 w-full"
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentPage;
