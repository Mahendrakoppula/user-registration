'use client';
import LiveIcon from '@/components/live-badge';
import useLoading from '@/hooks/use-loading';
import { PaymentStatus } from '@/typings/payment';
import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';
type State = {
  number: string;
};

export default function Home() {
  const { loading, onLoading } = useLoading();

  const [state, setState] = React.useState(null);
  const onSubmit = React.useCallback(
    async (values: State) => {
      onLoading(true);
      try {
        const { data } = await axios.get(`/api/registration/${values.number}`);
        console.log(data);
        if (data.response) {
          setState(data.response);
        }
        onLoading(false);
      } catch (error) {
        console.log(error);

        onLoading(false);
      }
    },
    [onLoading]
  );

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      number: '',
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
      number: Yup.string().required('Please enter your registration number'),
    }),
  });

  //

  const response = React.useMemo(() => {
    if (state) {
      //   delete fields from object

      const excludeFieldArray = Object.entries(state)
        .filter(([key, value]) => {
          return !['_id', 'accept'].includes(key);
        })
        .sort((a, b) => {
          if (a[0] === 'lastModified') return 1;
          if (b[0] === 'lastModified') return -1;
          return 0;
        });

      const excludeField = Object.fromEntries(excludeFieldArray);
      return Object.entries(excludeField);
    } else {
      return [];
    }
  }, [state]);

  const textStatus = React.useMemo(() => {
    if (response.length > 0) {
      return 'No Result Found';
    }

    return 'Get your application status by entering your registration number';
  }, [response.length]);

  const Conditional = React.useCallback((key: any, value: any) => {
    switch (key) {
      case 'paymentStatus':
        return value === PaymentStatus.PENDING
          ? 'Your application is under review'
          : value === PaymentStatus.APPORVED
          ? 'Your application is approved'
          : 'Your application is under review';
      case 'isMetricPass':
        return value === true ? 'Yes' : 'No';
      case 'churchMembership':
        return value === true ? 'Yes' : 'No';
      case 'lastModified':
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            {moment(value).format('ddd DD MMM YYYY, h:mm:ss a')}
          </span>
        );
      default:
        return isUrl(value) ? (
          <a
            href={value as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            View
          </a>
        ) : (
          value
        );
    }
  }, []);

  return (
    <React.Fragment>
      <div className="flex  items-center justify-center h-32">
        <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
          <span className=" text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Check Your
          </span>{' '}
          Application Status
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            name="number"
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your application id"
            onChange={handleChange}
            value={values.number}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
             "
          >
            Search
          </button>
        </div>
        {errors.number && (
          <div className="flex items-center justify-center w-full h-10 mt-2 text-sm text-red-500 bg-red-100 rounded-lg  ">
            <p className="text-red-500 text-base">{errors.number}</p>
          </div>
        )}
        {/* User Result  */}
      </form>
      {loading ? (
        <Loader />
      ) : response.length > 0 ? (
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                </tr>
              </thead>
              <tbody>
                {response.map(([key, value], index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b  hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {key}
                      </th>
                      <td className="px-6 py-4">{Conditional(key, value)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        textStatus && (
          <div className="flex items-center justify-center w-full h-10 text-sm border-dotted border-2 border-gray-100 rounded-md">
            <p className="text-center text-gray-900">{textStatus}</p>
          </div>
        )
      )}
      {/* Footer */}
      <p className="text-lg text-center text-gray-500">
        Do you want to register for the next batch?{' '}
        <Link
          href={'/registration'}
          className="inline-flex items-center font-medium text-blue-600 hover:underline"
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
      </p>
    </React.Fragment>
  );
}

// Apple green color code: #4cd964

const Loader = () => {
  return (
    <div className="relative flex flex-col gap-4 items-center justify-center min-h-[200px]">
      <LiveIcon />
      <p className="text-sm  text-center text-gray-900 ">Loading...</p>
    </div>
  );
};

function isUrl(string: any) {
  const regex = RegExp(/^(https?| ftp):\/\/[^\s/$.?#/][^\s]*$/i);
  return regex.test(string);
}

// const isBoolean = (key: boolean, value: boolean) => {
//   if (value === true) {
//     return 'Yes';
//   }
//   if (value === false) {
//     return 'No';
//   }
//   return value;
// };
