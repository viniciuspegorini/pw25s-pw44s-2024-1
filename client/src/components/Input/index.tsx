import React from "react";

interface IInputProps {
  id: string;
  name: string;
  className: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  hasError: boolean;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Input({
  id,
  name,
  className,
  label,
  type,
  value,
  placeholder,
  hasError,
  error,
  onChange,
}: IInputProps) {
  let inputClassName = className;
  if (hasError) {
    inputClassName += " is-invalid";
  }

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={inputClassName}
        value={value}
        onChange={onChange}
      />
      {hasError && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
