import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
}): JSX.Element => {
  return <button>{children}</button>;
};

export default CustomButton;
