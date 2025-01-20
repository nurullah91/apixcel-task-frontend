import ChangePasswordForm from "@/src/components/Forms/ChangePassordForm";
import { Link } from "@heroui/link";

export interface IChangePasswordProps {}
export default function ChangePassword({}: IChangePasswordProps) {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Change password</h1>
      <div className="w-full max-w-[600px] mx-auto">
        <ChangePasswordForm />
        <p className="text-sm">
          Not ready? <Link href="/">home</Link>
        </p>
      </div>
    </div>
  );
}
