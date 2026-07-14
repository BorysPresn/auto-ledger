import { RegisterForm } from "../../../features/auth";
import { AuthLayout } from "../../../widgets";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <RegisterForm />
    </AuthLayout>
  );
};
