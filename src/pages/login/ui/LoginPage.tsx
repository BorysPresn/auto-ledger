import { LoginForm } from "../../../features/auth";
import { AuthLayout } from "../../../widgets";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
};
