/* eslint-disable @next/next/no-img-element */
import React from 'react';

type FilePickerProps = {
  label?: string;
  file: File;
  accept?: string[];
  multiple?: boolean;
  onChange: (file: File) => void;
};

const FilePicker = ({
  file,
  accept,
  multiple,
  label,
  onChange,
}: FilePickerProps) => {
  const [state, setstate] = React.useState(file || null);
  return (
    <ul className="my-4 space-y-3">
      {state ? (
        <li>
          <input type="file" className="hidden" />
          <label className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow ">
            <img src={images[0].image} alt="image" height={28} width={28} />
            <span className="flex-1 ml-3 whitespace-nowrap">File.png</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded  ">
              2MB
            </span>
          </label>
        </li>
      ) : (
        <li>
          <input type="file" className="hidden" />
          <label className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow ">
            <img src={images[0].image} alt="image" height={28} width={28} />
            <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
          </label>
        </li>
      )}
    </ul>
  );
};
export default FilePicker;

const images = [
  {
    image: 'https://img.icons8.com/fluency/128/pdf.png',
    mimeType: ['application/pdf'],
  },
];
