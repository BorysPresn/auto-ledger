import { NavLink } from "react-router-dom";
import { Button, Input } from "../../../../shared";
import styles from "../../ui/AuthForm.module.scss";

export const LoginForm = () => {
  return (
    <form className={styles.form}>
      <Input type="text" label="Email" />
      <Input type="password" label="Password" />
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
