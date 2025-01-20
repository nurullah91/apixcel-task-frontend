import LoginForm from "@/src/components/Forms/LoginForm";
import { Link } from "@heroui/link";

export interface ILoginPageProps {}
export default function LoginPage({}: ILoginPageProps) {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Please login</h1>
      <div className="w-full max-w-[600px] mx-auto">
        <LoginForm />
        <p className="text-sm">
          New to this website? <Link href="/signup">signup</Link>
        </p>
      </div>
    </div>
  );
}
