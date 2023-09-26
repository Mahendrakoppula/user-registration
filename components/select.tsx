type InputFieldProps = {
  label: string;
} & React.ComponentPropsWithoutRef<'select'>;

const Select = (props: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
        {...props}
      >
        {props.children}
      </select>
    </div>
  );
};

export default Select;
