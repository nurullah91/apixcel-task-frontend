import ResetPasswordForm from "@/src/components/Forms/ResetPasswordForm";
import { Link } from "@heroui/link";

export interface IResetPasswordProps {}
export default function ResetPassword({}: IResetPasswordProps) {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Reset Password</h1>
      <div className="w-full max-w-[600px] mx-auto">
        <ResetPasswordForm />
        <p className="text-sm">
          Not ready? <Link href="/">home</Link>
        </p>
      </div>
    </div>
  );
}
