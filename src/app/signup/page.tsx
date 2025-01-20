import SignupForm from "@/src/components/Forms/SignupForm";
import { Link } from "@heroui/link";

export interface ISignupPageProps {}
export default function SignupPage({}: ISignupPageProps) {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Please signup</h1>
      <div className="w-full max-w-[600px] mx-auto">
        <SignupForm />
        <p className="text-sm">
          Already Have an account? <Link href="/login">login</Link>
        </p>
      </div>
    </div>
  );
}
