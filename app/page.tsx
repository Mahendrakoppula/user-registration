'use client';
import LiveIcon from '@/components/live-badge';
import useLoading from '@/hooks/use-loading';
import axios from 'axios';
import { useFormik } from 'formik';
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
      const excludeField = Object.fromEntries(
        Object.entries(state).filter(([key, value]) => {
          return !['_id', 'accept'].includes(key);
        })
      );
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

  return (
    <main className="flex max-w-screen-md mx-auto min-h-screen flex-col p-24 gap-10">
      <div className="flex  items-center justify-center h-32">
        <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className=" text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Check Your
          </span>{' '}
          Application Status
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your application id"
            onChange={handleChange}
            value={values.number}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  console.log(key, isUrl(value));

                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key}
                      </th>
                      <td className="px-6 py-4">
                        {isUrl(value) ? (
                          <a
                            href={value as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                          >
                            View
                          </a>
                        ) : (
                          isBoolean(value as any)
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        textStatus && (
          <div className="flex items-center justify-center w-full h-10  text-sm border-dotted border-2 border-gray-500 rounded-md">
            <p className="text-center text-gray-900 dark:text-white">
              {textStatus}
            </p>
          </div>
        )
      )}
      {/* Footer */}
      <p className="text-lg text-center text-gray-500 dark:text-gray-400">
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
      </p>
    </main>
  );
}

// Apple green color code: #4cd964

const Loader = () => {
  return (
    <div className="relative flex flex-col gap-4 items-center justify-center min-h-[200px]">
      <LiveIcon />
      <p className="text-sm  text-center text-gray-900 dark:text-white">
        Loading...
      </p>
    </div>
  );
};

function isUrl(string: any) {
  const regex = RegExp(/^(https?| ftp):\/\/[^\s/$.?#/][^\s]*$/i);
  return regex.test(string);
}

const isBoolean = (value: boolean) => {
  if (value === true) {
    return 'Yes';
  }
  if (value === false) {
    return 'No';
  }
  return value;
};
