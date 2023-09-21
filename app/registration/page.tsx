'use client';

import axios from 'axios';
import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import maker from '@/utils/maker';
import { useFormik } from 'formik';
import Input from '@/components/input';
import { customAlphabet } from 'nanoid';
import Select from '@/components/select';
import Wraper from '@/components/wraper';
import { useRouter } from 'next/navigation';

const characters = Array.from({ length: 10 }, (_, i) => i).join('');

const generator = customAlphabet(characters, 10);

const initialState = {
  loading: false,
  //
  trainingCenter: '',
  medium: '',
  firstName: '',
  lastName: '',
  gender: '',
  bloodGroup: '',
  dateOfBirth: new Date().toISOString().split('T')[0],
  relation: '',
  residentialAddress: '',
  churchMembership: '',
  pastorName: '',
  contactNumber: '',
  alternateNumber: '',
  educationQualification: '',
  occupation: '',
  // FILES
  email: '',
  nationality: 'India',
  isMetricPass: false,
  accept: false,
  idProof: null as File | null,
  markSheet: null as File | null,
  passportPhoto: null as File | null,
  signature: null as File | null,
};

type State = typeof initialState;
export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const docsPrefix = process.env.NEXT_PUBLIC_DOCUMENT_URL;
  /**
   * Submit the form
   */
  const onSubmit = React.useCallback(
    async (value: State) => {
      setLoading(true);
      try {
        const registrationNumber = generator(12);
        const formData = new FormData();
        const docs = {
          get idProof() {
            return '';
          },
          get markSheet() {
            return '';
          },
          get passportPhoto() {
            return '';
          },
          get signature() {
            return '';
          },
        };

        if (value.idProof) {
          Object.defineProperty(docs, 'idProof', {
            value: maker(`${registrationNumber}-${value.idProof.name}`),
            writable: false,
          });
        }
        if (value.markSheet) {
          Object.defineProperty(docs, 'markSheet', {
            value: maker(`${registrationNumber}-${value.markSheet.name}`),
            writable: false,
          });
        }
        if (value.passportPhoto) {
          Object.defineProperty(docs, 'passportPhoto', {
            value: maker(`${registrationNumber}-${value.passportPhoto.name}`),
            writable: false,
          });
        }
        if (value.signature) {
          Object.defineProperty(docs, 'signature', {
            value: maker(`${registrationNumber}-${value.signature.name}`),
            writable: false,
          });
        }

        if (value.idProof) {
          formData.append(docs.idProof, value.idProof);
          console.log('ID PROOF', value.idProof.name);
        }
        if (value.markSheet) {
          formData.append(docs.markSheet, value.markSheet);
          console.log('MARK SHEET', value.markSheet.name);
        }
        if (value.passportPhoto) {
          formData.append(docs.passportPhoto, value.passportPhoto);
          console.log('PASSPORT PHOTO', value.passportPhoto.name);
        }
        if (value.signature) {
          formData.append(docs.signature, value.signature);
          console.log('SIGNATURE', value.signature.name);
        }

        // Step 1: Upload the files
        await axios.post('/api/upload', formData);

        console.log('FILES', docs);
        // Step 2: Save the data
        const payload = {
          trainingCenter: value.trainingCenter,
          medium: value.medium,
          firstName: value.firstName,
          lastName: value.lastName,
          gender: value.gender,
          bloodGroup: value.bloodGroup,
          dateOfBirth: value.dateOfBirth,
          relation: value.relation,
          residentialAddress: value.residentialAddress,
          churchMembership: value.churchMembership,
          pastorName: value.pastorName,
          contactNumber: value.contactNumber,
          alternateNumber: value.alternateNumber,
          educationQualification: value.educationQualification,
          occupation: value.occupation,
          email: value.email,
          nationality: value.nationality,
          isMetricPass: value.isMetricPass,
          accept: value.accept,
          // Unique Number
          registrationNumber,
        };
        console.log('PAYLOAD', payload);
        const files = {
          idProof: `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${docs.idProof}`,
          markSheet: `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${docs.markSheet}`,
          passportPhoto: `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${docs.passportPhoto}`,
          signature: `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${docs.signature}`,
        };
        const { data } = await axios({
          method: 'POST',
          url: '/api/registration',
          data: Object.assign(payload, files),
        });
        console.log('DONE WITH NO ERROR', data);
        setLoading(false);
        router.push(`/payment?registration=${data.registrationNumber}`);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [router]
  );
  /**
   * Formik
   */
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      console.log(values);
      onSubmit(values);
    },
    validationSchema: Yup.object().shape({
      trainingCenter: Yup.string().required('Required'),
      medium: Yup.string().required('Required'),
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      gender: Yup.string().required('Required'),
      bloodGroup: Yup.string().required('Required'),
      dateOfBirth: Yup.string().required('Required'),
      relation: Yup.string().required('Required'),
      residentialAddress: Yup.string().required('Required'),
      churchMembership: Yup.string().required('Required'),
      pastorName: Yup.string().required('Required'),
      contactNumber: Yup.string().required('Required'),
      alternateNumber: Yup.string().required('Required'),
      educationQualification: Yup.string().required('Required'),
      occupation: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      nationality: Yup.string().required('Required'),
      isMetricPass: Yup.boolean().required('Required'),
      accept: Yup.boolean().required('Required'),
      // For Files
      idProof: Yup.mixed().required('Required'),
      markSheet: Yup.mixed().required('Required'),
      passportPhoto: Yup.mixed().required('Required'),
      signature: Yup.mixed().required('Required'),
    }),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex  items-center justify-center h-32">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Registration
          </span>{' '}
          Form
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? 'none' : 'all',
        }}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            name="trainingCenter"
            label="Training center"
            id="training_center"
            placeholder="Training center"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.trainingCenter}
            error={touched.trainingCenter && errors.trainingCenter}
          />
          <Input
            type="text"
            name="medium"
            label="Medium"
            id="medium"
            placeholder="Medium"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.medium}
            error={touched.medium && errors.medium}
          />
          <Input
            type="text"
            name="firstName"
            label="First name"
            id="first_name"
            placeholder="John"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && errors.firstName}
          />
          <Input
            type="text"
            name="lastName"
            label="Last name"
            id="last_name"
            placeholder="Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && errors.lastName}
          />
        </div>
        <div className="mb-6">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            label="Nationality"
            placeholder="Your Nationality"
            name="nationality"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nationality}
            error={touched.nationality && errors.nationality}
          />
          <Input
            type="text"
            label="S/o or W/o D/o"
            id="s/o_or_w/o_d/o"
            placeholder="S/o or W/o D/o"
            name="relation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.relation}
            error={touched.relation && errors.relation}
          />
        </div>
        <div className="mb-6">
          <Wraper label="Gender">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {['Male', 'Female', 'Other'].map((item, index) => (
                <li
                  key={index}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                >
                  <div className="flex items-center pl-3">
                    <Input
                      id={item.toLowerCase()}
                      type="radio"
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={item}
                    />
                    <label
                      htmlFor={item.toLowerCase()}
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {item}
                    </label>
                  </div>
                </li>
              ))}
            </ul>

            {touched.gender && errors.gender && (
              <div className="flex  w-full mt-2 ">
                <p className="text-red-500 text-sm">{errors.gender}</p>
              </div>
            )}
          </Wraper>
        </div>

        <div className="mb-6">
          <Select
            label="Blood group"
            name="bloodGroup"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bloodGroup}
          >
            {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(
              (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            )}
          </Select>
          {touched.bloodGroup && errors.bloodGroup && (
            <div className="flex  w-full mt-2 ">
              <p className="text-red-500 text-sm">{errors.bloodGroup}</p>
            </div>
          )}
        </div>
        <div className="mb-6">
          <Input
            type="date"
            label="Date of Birth"
            id="date_of_birth"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dateOfBirth}
            name="dateOfBirth"
            error={touched.dateOfBirth && errors.dateOfBirth}
          />
        </div>

        <div className="mb-6">
          <Wraper label="Residential Address">
            <textarea
              name="residentialAddress"
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.residentialAddress}
            ></textarea>
            {touched.residentialAddress && errors.residentialAddress && (
              <div className="flex  w-full mt-2 ">
                <p className="text-red-500 text-sm">
                  {errors.residentialAddress}
                </p>
              </div>
            )}
          </Wraper>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            label="Church membership"
            placeholder="Church membership"
            name="churchMembership"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.churchMembership}
            error={touched.churchMembership && errors.churchMembership}
          />

          <Input
            type="text"
            label="Name of the pastor"
            placeholder="Name of the pastor"
            name="pastorName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pastorName}
            error={touched.pastorName && errors.pastorName}
          />

          <Input
            type="tel"
            label="Contact Number"
            placeholder="Contact Number"
            name="contactNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactNumber}
            error={touched.contactNumber && errors.contactNumber}
          />
          <Input
            type="tel"
            label="Alternate Number"
            placeholder="Alternate Number"
            name="alternateNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.alternateNumber}
            error={touched.alternateNumber && errors.alternateNumber}
          />
          <Input
            type="text"
            label="Education Qualification"
            placeholder="Education Qualification"
            name="educationQualification"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.educationQualification}
            error={
              touched.educationQualification && errors.educationQualification
            }
          />
          <Input
            type="tel"
            label="Occupation"
            placeholder="Ex: Student"
            name="occupation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.occupation}
            error={touched.occupation && errors.occupation}
          />
        </div>
        <div className="mb-6">
          <Wraper label="10th Qualified?">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {['Yes', 'No'].map((item, index) => (
                <li
                  key={index}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                >
                  <div className="flex items-center pl-3">
                    <Input
                      id={item.toLowerCase()}
                      type="radio"
                      name="isMetricPass"
                      onChange={({ target }) => {
                        setFieldValue('isMetricPass', target.value === 'Yes');
                      }}
                      onBlur={handleBlur}
                      value={values.isMetricPass ? 'Yes' : 'No'}
                    />
                    <label
                      htmlFor={item.toLowerCase()}
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {item}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </Wraper>
          {touched.isMetricPass && errors.isMetricPass && (
            <div className="flex  w-full mt-2 ">
              <p className="text-red-500 text-sm">{errors.isMetricPass}</p>
            </div>
          )}
        </div>

        <div className="grid gap-6 mb-6">
          <Input
            type="file"
            name="idProof"
            label="Id Proof( Aadhar/Driving license/Passsport )"
            placeholder="Id Proof( Aadhar/Driving license/Passsport )"
            caption="PNG, JPG, WEBP up to 10MB"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={({ target }) => {
              if (target.files) {
                setFieldValue(target.name, target.files[0]);
              }
            }}
            error={touched.idProof && errors.idProof}
          />
          <Input
            type="file"
            name="markSheet"
            label="10th certificate"
            placeholder="10th certificate"
            onChange={({ target }) => {
              if (target.files) {
                setFieldValue(target.name, target.files[0]);
              }
            }}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png"
            caption="Supported formats: pdf, doc, docx, jpg, jpeg, png. Max file size 2Mb"
            error={touched.markSheet && errors.markSheet}
          />
          <Input
            type="file"
            name="passportPhoto"
            label="PassPort size photo"
            placeholder="PassPort size photo"
            onChange={({ target }) => {
              if (target.files) {
                setFieldValue(target.name, target.files[0]);
              }
            }}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            caption="PNG, JPG, WEBP up to 2MB"
            error={touched.passportPhoto && errors.passportPhoto}
          />
          <Input
            name="signature"
            label="Signature"
            type="file"
            placeholder="Signature"
            onChange={({ target }) => {
              if (target.files) {
                setFieldValue(target.name, target.files[0]);
              }
            }}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            caption="PNG, JPG, WEBP up to 1MB"
            error={touched.signature && errors.signature}
          />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <Input
              id="remember"
              type="checkbox"
              name="accept"
              onChange={handleChange}
              value={values.accept?.toString() ?? ''}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{' '}
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </Link>
            .
          </label>
        </div>
        {touched.accept && errors.accept && (
          <div className="flex  w-full mt-2 ">
            <p className="text-red-500 text-sm">{errors.accept}</p>
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
