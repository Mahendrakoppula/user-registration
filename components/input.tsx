type InputFieldProps = {
  label?: string;
  caption?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = (props: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      {props.label && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      )}
      <input
        className={`${props.className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        {...props}
      />
      {props.caption && (
        <div
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="user_avatar_help"
        >
          {props.caption}
        </div>
      )}
    </div>
  );
};

export default Input;
