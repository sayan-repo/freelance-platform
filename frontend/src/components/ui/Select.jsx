const Select = ({ 
    id, 
    name, 
    className = '', 
    children, 
    value, 
    onChange,
    ...props 
  }) => {
    return (
      <select
        id={id}
        name={name}
        className={`block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
        value={value}
        onChange={onChange}
        {...props}
      >
        {children}
      </select>
    );
  };
  
  export default Select;