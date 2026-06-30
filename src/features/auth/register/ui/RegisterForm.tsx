import { NavLink } from "react-router-dom";
import { Button, Input } from "../../../../shared";
import styles from "../../ui/AuthForm.module.scss";
import { useForm } from "react-hook-form";
import { EMAIL_PATTERN, PASSWORD_MIN_LENGTH } from "../../model/validation";
import type { RegisterFormValues } from "../../model/types";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const passwordValue = watch("password");

  const registerFormSubmit = (data: RegisterFormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(registerFormSubmit)}>
      <Input
        type="text"
        label="First name"
        {...register("firstName", {
          setValueAs: (value) => value.trim(),
          required: "First name is required",
        })}
        error={errors.firstName?.message}
      />
      <Input
        type="text"
        label="Last name"
        {...register("lastName", {
          setValueAs: (value) => value.trim(),
          required: "Last name is required",
        })}
        error={errors.lastName?.message}
      />
      <Input
        type="text"
        label="Email"
        {...register("email", {
          setValueAs: (value) => value.trim(),
          required: "Email is required",
          pattern: {
            value: EMAIL_PATTERN,
            message: "Wrong email format",
          },
        })}
        error={errors.email?.message}
      />
      <Input
        type="password"
        label="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: "Password must be at least 6 characters long",
          },
        })}
        error={errors.password?.message}
      />
      <Input
        type="password"
        label="Repeat password"
        {...register("repeatPassword", {
          required: "Repeat password is required",
          validate: (value) => {
            return value === passwordValue || "Passwords do not match";
          },
        })}
        error={errors.repeatPassword?.message}
      />
      <div className={styles.formActions}>
        <NavLink to={"/login"} className={styles.link}>
          Back
        </NavLink>
        <Button type="submit" variant="blue" shape="pill">
          Sign up
        </Button>
      </div>
    </form>
  );
};
