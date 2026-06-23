import { NavLink } from "react-router-dom";
import { Button, Input } from "../../../../shared";
import styles from "../../ui/AuthForm.module.scss";

export const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <Input type="text" label="First name" />
      <Input type="text" label="Last name" />
      <Input type="text" label="Email" />
      <Input type="password" label="Password" />
      <Input type="password" label="Repeat password" />
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
