import React, { forwardRef, useId } from "react";

import clsx from "clsx";

import cl from "./Input.module.scss";

type AllowedInputType = "text" | "password" | "email";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  type: AllowedInputType;
  label?: string;
  inputId?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, inputId, placeholder, type, error, ...rest }, ref) => {
    const uniqueId = useId();
    const inpId = inputId || uniqueId;

    return (
      <div className={clsx(cl.inputContainer, error && cl.error)}>
        {label && (
          <label htmlFor={inpId} className={cl.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inpId}
          type={type}
          placeholder={placeholder}
          className={cl.input}
          {...rest}
        />
        <p className={clsx(cl.error, error && cl.showError)}>{error}</p>
      </div>
    );
  },
);

Input.displayName = "Input";