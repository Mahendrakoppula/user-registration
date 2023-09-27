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
import moment from 'moment';
import {
  acceptNumbers,
  acceptString,
  removeSpace,
} from '@/utils/str-operations';
import { PaymentStatus } from '@/typings/payment';

const characters = Array.from({ length: 10 }, (_, i) => i).join('');

const generator = customAlphabet(characters, 4);

const initialState = {
  loading: false,
  //
  trainingCenter: 'Hyderabad',
  medium: 'English',
  firstName: '',
  lastName: '',
  gender: '',
  bloodGroup: 'A+',
  // 18 years old
  dateOfBirth: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    .toISOString()
    .split('T')[0],
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

const schema = Yup.object().shape({
  trainingCenter: Yup.string().required('Training center is required'),
  medium: Yup.string().required('Medium is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  bloodGroup: Yup.string().required('Blood group is required'),
  dateOfBirth: Yup.date()
    .max(
      // Member shold be 18 above
      moment(new Date()).subtract(18, 'years').format('YYYY-MM-DD'),
      'You should be 18 years old'
    )

    .required('Date of birth is required'),
  relation: Yup.string().required('Relation is required'),
  residentialAddress: Yup.string().required('Residential address is required'),
  // churchMembership: Yup.string().required('Church membership is required'),
  // pastorName: Yup.string().required('Pastor name is required'),
  contactNumber: Yup.string()
    .min(10, 'Contact at least 10 digits')
    .max(11, 'Landline number should be 11 digits')
    .required('Contact number is required'),
  alternateNumber: Yup.string()
    .min(10, 'Alternate number at least 10 digits')
    .max(11, 'Landline number should be 11 digits'),
  educationQualification: Yup.string().required(
    'Education Qualification is required'
  ),
  occupation: Yup.string().required('Occupation is required'),
  email: Yup.string()
    .test(
      'email',
      'Email is invalid',
      (value) =>
        !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    )
    .required('Email is required'),
  nationality: Yup.string().required('Nationality is required'),
  isMetricPass: Yup.boolean().required('Metric pass is required'),
  accept: Yup.boolean().isTrue('Accept the terms and conditions'),
  // For Files
  idProof: Yup.mixed().required('ID Proof is required'),
  markSheet: Yup.mixed().required('Mark sheet is required'),
  passportPhoto: Yup.mixed().required('Passport photo is required'),
  signature: Yup.mixed().required('Signature is required'),
});

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  /**
   * Submit the form
   */
  const onSubmit = React.useCallback(
    async (value: State) => {
      setLoading(true);
      try {
        // REGISTRATION NUMBER FORMAT
        // Date of birth + 5 random numbers

        const registrationNumber = generator(6);
        const btm = moment(value.dateOfBirth).format('DDMMYYYY');
        const registrationNumberFormat = `BTM-${btm}-${registrationNumber}`;

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
          firstName: value.firstName.trim(),
          lastName: value.lastName.trim(),
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
          paymentStatus: PaymentStatus.PENDING,
          // Unique Number
          registrationNumber: registrationNumberFormat,
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
      onSubmit(values);
    },
    validationSchema: schema,
  });

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'e') {
        e.preventDefault();
      }
    },
    []
  );

  return (
    <React.Fragment>
      <div className=" flex  items-center justify-center h-32">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
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
        <div className="grid gap-6 mb-6 md:grid-cols-2 mobile:gap-2">
          <div className="mb-6">
            <Select
              label="Training center"
              name="trainingCenter"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.trainingCenter}
            >
              {trainingCenters.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            {touched.trainingCenter && errors.trainingCenter && (
              <div className="flex  w-full mt-2 ">
                <p className="text-red-500 text-sm">{errors.trainingCenter}</p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <Select
              label="Medium"
              name="medium"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.medium}
            >
              {['English', 'Telugu'].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            {touched.medium && errors.medium && (
              <div className="flex  w-full mt-2 ">
                <p className="text-red-500 text-sm">{errors.medium}</p>
              </div>
            )}
          </div>
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
            type="text"
            label="Email"
            placeholder="eg. example@gmail.com"
            name="email"
            onChange={(event) => {
              const value = event.target.value;
              setFieldValue('email', removeSpace(value));
            }}
            onBlur={handleBlur}
            value={removeSpace(values.email)}
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
            label="S/O or W/O or D/O"
            id="s/o_or_w/o_d/o"
            placeholder="S/O or W/O or D/O"
            name="relation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={removeSpace(values.relation)}
            error={touched.relation && errors.relation}
          />
        </div>
        <div className="mb-6">
          <Wraper label="Gender">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
              {['Male', 'Female', 'Other'].map((item, index) => (
                <li
                  key={index}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
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
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
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
            // min={
            //   new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            //     .toISOString()
            //     .split('T')[0]
            // }
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="mb-6">
          <Wraper label="Residential Address">
            <textarea
              name="residentialAddress"
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your residential address"
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
            min={0}
            type="number"
            label="Contact Number"
            placeholder="Contact Number"
            name="contactNumber"
            onChange={({ target }) => {
              setFieldValue('contactNumber', target.value);
            }}
            onBlur={handleBlur}
            value={values.contactNumber}
            error={touched.contactNumber && errors.contactNumber}
            maxLength={11}
            onKeyDown={onKeyDown}
            max={99999999999}
          />
          <Input
            min={0}
            type="number"
            label="Alternate Number"
            placeholder="Alternate Number"
            name="alternateNumber"
            onChange={({ target }) => {
              setFieldValue('alternateNumber', target.value);
            }}
            onBlur={handleBlur}
            value={values.alternateNumber}
            error={touched.alternateNumber && errors.alternateNumber}
            maxLength={11}
            onKeyDown={onKeyDown}
            max={99999999999}
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
            type="text"
            label="Occupation"
            placeholder="Ex: Student"
            name="occupation"
            onChange={({ target }) => {
              if (acceptString(target.value)) {
                setFieldValue('occupation', target.value);
              }
            }}
            onBlur={handleBlur}
            value={values.occupation}
            error={touched.occupation && errors.occupation}
          />
        </div>
        <div className="mb-6">
          <Wraper label="10th Qualified?">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
              {['Yes', 'No'].map((item, index) => (
                <li
                  key={index}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
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
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
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
            caption="Supported formats: pdf, doc, docx, jpg, jpeg, png. Max file size 2Mb"
            accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={({ target }) => {
              const file = (target.files && target.files[0]) as File;
              if (checkFileSize(file, 'File size should be less than 2MB')) {
                if (file) {
                  setFieldValue(target.name, file);
                }
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
              const file = (target.files && target.files[0]) as File;
              if (checkFileSize(file, 'File size should be less than 2MB')) {
                if (file) {
                  setFieldValue(target.name, file);
                }
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
              const file = (target.files && target.files[0]) as File;
              if (checkFileSize(file, 'File size should be less than 2MB')) {
                if (file) {
                  setFieldValue(target.name, file);
                }
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
              const file = (target.files && target.files[0]) as File;
              if (checkFileSize(file, 'File size should be less than 2MB')) {
                if (file) {
                  setFieldValue(target.name, file);
                }
              }
            }}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            caption="PNG, JPG, WEBP up to 1MB"
            error={touched.signature && errors.signature}
          />
        </div>

        <div className="flex items-start mb-2">
          <div className="flex items-center h-5">
            <Input
              id="remember"
              type="checkbox"
              name="accept"
              onChange={({ target }) => {
                setFieldValue('accept', target.checked);
              }}
              checked={values.accept}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 "
          >
            I agree with the{' '}
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 hover:underline"
            >
              terms and conditions
            </Link>
            .
          </label>
        </div>
        {touched.accept && errors.accept && (
          <div className="flex  w-full my-2 ">
            <p className="text-red-500 text-sm">{errors.accept}</p>
          </div>
        )}
        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

// Hyderabad
// Tirupati
// Kurnool
// Chilakaluripeta
// Nidadavolu

const trainingCenters = [
  {
    name: 'Hyderabad',
  },
  {
    name: 'Tirupati',
  },
  {
    name: 'Kurnool',
  },
  {
    name: 'Chilakaluripeta',
  },
  {
    name: 'Nidadavolu',
  },
];

const checkFileSize = (file: File, message: string) => {
  if (!file) return false;
  if (file.size > 2000000) {
    alert(message);
    return false;
  }
  return true;
};
