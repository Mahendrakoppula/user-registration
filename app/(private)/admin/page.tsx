/* eslint-disable react/no-unescaped-entities */
// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import React from 'react';

async function getRegistrations() {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/registration`
    );
    const json = await data.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const Dashboard = async () => {
  const data = (await getRegistrations()) as Registration[];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Registration ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Contact Number
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Status
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b  hover:bg-gray-50  "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  "
                  >
                    {item.registrationNumber}
                  </th>
                  <td className="px-6 py-4">
                    {item.firstName + ' ' + item.lastName}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.contactNumber}</td>
                  <td className="px-6 py-4">{item.paymentStatus}</td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/${item.registrationNumber}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;

type Registration = {
  _id: string;
  trainingCenter: string;
  medium: string;
  firstName: string;
  lastName: string;
  gender: string;
  bloodGroup: string;
  dateOfBirth: string;
  relation: string;
  residentialAddress: string;
  churchMembership: string;
  pastorName: string;
  contactNumber: string;
  alternateNumber: string;
  educationQualification: string;
  occupation: string;
  email: string;
  nationality: string;
  isMetricPass: boolean;
  accept: boolean;
  paymentStatus: null;
  registrationNumber: string;
  idProof: string;
  markSheet: string;
  passportPhoto: string;
  signature: string;
  lastModified: string;
  paymentScreenshot: string;
};
