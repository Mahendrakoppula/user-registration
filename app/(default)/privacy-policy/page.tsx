/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center h-32">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Privacy
          </span>{' '}
          Policy
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="1-definitions"
        >
          1. Information We Collect
        </h3>
        <p className="text-gray-600 ">
          We may collect the following categories of personal information:
          <p className="text-gray-600  font-bold">
             Contact Information:
          </p>{' '}
          This includes your name, email address, phone number, and mailing
          address.
          <p className="text-gray-600  font-bold">
             Student Identification:
          </p>{' '}
          We may collect student identification numbers or usernames to verify
          your identity within our system.
          <p className="text-gray-600  font-bold">
             Academic Information:
          </p>{' '}
          This includes details about your current educational institution,
          major, and year of study.
          <p className="text-gray-600  font-bold">
             Course Registration Details:
          </p>{' '}
          Information related to the courses you register for, including course
          names, dates, times, and fees.
          <p className="text-gray-600  font-bold">1.5. Payment Information: </p>
          We may collect payment details such as credit card numbers, billing
          addresses, and transaction history, but this information is securely
          processed by our payment service provider and is not stored on our
          servers.
          <p className="text-gray-600  font-bold">
             Communication Preferences:
          </p>{' '}
          Information regarding your communication preferences, including
          subscription to newsletters and updates.
          <p className="text-gray-600  font-bold">
             Device and Usage Information:{' '}
          </p>
          We may automatically collect information about your device and how you
          use our website, including your IP address, browser type, and
          operating system.
        </p>
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="2-acceptance-of-terms-and-conditions"
        >
          2. How We Use Your Information
        </h3>
        <p className="text-gray-600 ">
          We use your personal information for the following purposes:
          <p className="text-gray-600  font-bold"> Course Registration: </p>
          To facilitate your course registration and manage your enrollment.
          <p className="text-gray-600  font-bold"> Communication: </p>To
          communicate with you regarding course updates, schedules, and
          administrative matters.
          <p className="text-gray-600  font-bold"> Customer Support:</p> To
          provide customer support and respond to your inquiries.
          <p className="text-gray-600  font-bold"> Analytics:</p> To analyze
          and improve our Services, including user experience and course
          offerings.
          <p className="text-gray-600  font-bold"> Marketing:</p> To send
          you promotional materials and updates about our courses and services
          if you have consented to receive such communications.
        </p>
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="3-scope-of-services"
        >
          3. Disclosure of Your Information
        </h3>
        <p className="text-gray-600 ">
          We may share your personal information with the following parties:
          <p className="text-gray-600  font-bold"> Instructors:</p> Your
          information may be shared with instructors for course-related
          communication and administration.
          <p className="text-gray-600  font-bold"> Service Providers: </p>We
          may engage third-party service providers to assist with technical,
          administrative, or marketing functions, and they may have access to
          your personal information only to the extent necessary to perform
          their functions.
          <p className="text-gray-600  font-bold"> Legal Compliance:</p> We
          may disclose your information to comply with legal obligations,
          respond to legal requests, or protect our rights and the rights of
          others.
        </p>
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="4-fees-and-payment"
        >
          4. Security
        </h3>
        <p className="text-gray-600 ">
          We implement appropriate technical and organizational measures to
          safeguard your personal information from unauthorized access and
          disclosure. However, no data transmission over the internet is
          entirely secure, and we cannot guarantee the absolute security of your
          information.
        </p>
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="5-cancellation-and-rescheduling"
        >
          5. Your Choices
        </h3>
        <p className="text-gray-600 ">
          You have the following rights regarding your personal information:
          <p className="text-gray-600  font-bold"> Access: </p>You can
          request access to the personal information we hold about you.
          <p className="text-gray-600  font-bold"> Correction: </p>You can
          request corrections to your personal information if it is inaccurate
          or incomplete.
          <p className="text-gray-600  font-bold"> Withdraw Consent:</p> You
          can withdraw your consent for marketing communications at any time.
          <p className="text-gray-600  font-bold"> Deletion: </p>You can
          request the deletion of your personal information, subject to legal
          requirements.
        </p>
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="6-confidentiality"
        >
          6. Contact Us
        </h3>
        <p className="text-gray-600 ">
          If you have any questions, concerns, or requests related to this
          Privacy Policy or your personal information, please contact us at:
        </p>
        <h3
          className="text-xl font-medium text-gray-800 md:text-2xl lg:text-2xl
        "
          id="7-intellectual-property"
        >
          7. Changes to this Policy
        </h3>
        <p className="text-gray-600 ">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. Any updates will be posted on
          our website, and the revised policy will be effective upon the posting
          date. By registering for our courses, you acknowledge and agree to
          this Privacy Policy.
        </p>
      </div>
    </React.Fragment>
  );
}
