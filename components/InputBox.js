import React from "react";

const InputBox = ({ type, label, name, onChange, value }) => {
  return (
    <>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type={type}
          name={name}
          id="price"
          onChange={onChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
          value={value}
        />
      </div>
    </>
  );
};

export default InputBox;
