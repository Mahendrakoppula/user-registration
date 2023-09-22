type InputFieldProps = {
  label?: string;
  caption?: string;
  error?: any;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = (props: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      {props.label && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {props.label}
        </label>
      )}
      <input
        className={`${props.className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        {...props}
      />
      {props.error && (
        <div className="flex  w-full mt-2 ">
          <p className="text-red-500 text-sm">{props.error}</p>
        </div>
      )}
      {props.caption && (
        <div
          className="mt-1 text-sm text-gray-500"
          id="user_avatar_help"
        >
          {props.caption}
        </div>
      )}
    </div>
  );
};

export default Input;
