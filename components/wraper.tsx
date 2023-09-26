type InputFieldProps = {
  id?: string;
  label: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Wraper = (props: InputFieldProps) => {
  return (
    <div className={`${props.className} flex flex-col`}>
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>

      {props.children}
    </div>
  );
};

export default Wraper;
