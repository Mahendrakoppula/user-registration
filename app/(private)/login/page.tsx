'use client';

import Input from '@/components/input';
import axios from 'axios';
import { useFormik } from 'formik';
import { redirect } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';

const AdminLogin = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: async (values) => {
        try {
          const { data } = await axios.post('/api/login', values);
          alert(data.message);
          // redirect('/admin');
        } catch (error: any) {
          alert(error.message);
        }
      },
      validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      }),
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && errors.username}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AdminLogin;
