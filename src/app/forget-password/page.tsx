import ForgetPasswordForm from "@/src/components/Forms/ForgetPasswordFrom";
import { Link } from "@heroui/link";

export interface IForgetPasswordProps {}
export default function ForgetPassword({}: IForgetPasswordProps) {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Forget password</h1>
      <div className="w-full max-w-[600px] mx-auto">
        <ForgetPasswordForm />
        <p className="text-sm">
          Remember password? <Link href="/login">login</Link>
        </p>
      </div>
    </div>
  );
}
