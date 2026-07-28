 import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join PropIntel AI and start making smarter real estate decisions."
    >
      <RegisterForm />
    </AuthLayout>
  );
}