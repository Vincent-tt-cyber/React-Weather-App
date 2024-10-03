import React from "react";
import styles from "./CustomInput.module.scss";

interface CustomInputProps {
  type: "text" | "number" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default CustomInput;
