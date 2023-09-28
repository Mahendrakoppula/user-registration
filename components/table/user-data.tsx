'use client';

import { PaymentStatus } from '@/typings/payment';
import { isUrl } from '@/utils/str-operations';
import moment from 'moment';
import React from 'react';
import Select from '../select';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  state: any;
};

const UserDataTable = ({ state }: Props) => {
  const router = useRouter();
  const response = () => {
    if (state) {
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
  };

  const Conditional = (key: any, value: any) => {
    switch (key) {
      case 'paymentStatus':
        return value === PaymentStatus.PENDING
          ? 'Payment is pending'
          : value === PaymentStatus.APPORVED
          ? 'Payment is approved'
          : 'Payment is under process';
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
  };

  const changePaymentStatus = React.useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      console.log(value);
      try {
        if (state.registrationNumber) {
          const { data } = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/registration/${state.registrationNumber}`,
            {
              paymentStatus: value,
            }
          );
          console.log(data);
          alert('Payment status updated');
          // LOAD SAME URL
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [router, state.registrationNumber]
  );

  return (
    <React.Fragment>
      <Select
        label="Update Payment Status"
        onChange={changePaymentStatus}
        value={state.paymentStatus}
      >
        <option value={PaymentStatus.PENDING}>{PaymentStatus.PENDING}</option>
        <option value={PaymentStatus.APPORVED}>{PaymentStatus.APPORVED}</option>
      </Select>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Field
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {response().map(([key, value], index) => {
              return (
                <tr key={index} className="bg-white border-b  hover:bg-gray-50">
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
    </React.Fragment>
  );
};
export default UserDataTable;
