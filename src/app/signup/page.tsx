import SignupForm from "@/src/components/Forms/SignupForm";

export interface ISignupPageProps {}
export default function SignupPage({}: ISignupPageProps) {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Please signup</h1>
      <div>
        <SignupForm />
      </div>
    </div>
  );
}
