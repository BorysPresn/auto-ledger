import { NavLink } from "react-router-dom";
import { Button, Input } from "../../../../shared";
import styles from "../../ui/AuthForm.module.scss";
import { useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "../../model/validation";
import type { LoginFormValues } from "../../model/types";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (data: LoginFormValues) => {
    console.log(data);
    reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
      <Input
        type="email"
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
          validate: (value) =>
            value.trim().length > 0 || "Password cannot contain only spaces",
        })}
        error={errors.password?.message}
      />
      <div className={styles.formActions}>
        <NavLink to={"/register"} className={styles.link}>
          Sign up
        </NavLink>
        <Button type="submit" variant="blue" shape="pill">
          Sign in
        </Button>
      </div>
    </form>
  );
};
