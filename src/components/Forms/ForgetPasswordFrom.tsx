"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { forgetPasswordSchema } from "@/src/schema";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";
import { useForgetPasswordMutation } from "@/src/redux/api/userApi";

export interface IForgetPasswordFormProps {}
export default function ForgetPasswordForm({}: IForgetPasswordFormProps) {
  const [sendEmail, { isLoading, isSuccess }] = useForgetPasswordMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await sendEmail(data);

      if (res.data.success) {
        toast.success("Email send success", { id: toastId });
      } else {
        toast.error("Failed to send email", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <CustomForm
        onSubmit={handleSubmit}
        resolver={zodResolver(forgetPasswordSchema)}
      >
        <CustomInput required label="Email" name="email" type="email" />

        <Button
          className="my-3"
          isDisabled={isLoading}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isLoading ? "Sending..." : "Send Email"}
        </Button>
      </CustomForm>
      <div>
        {!isLoading && isSuccess && (
          <p className="text-red-500 text-xs my-2">
            An email sent to your email with reset password link
          </p>
        )}
      </div>
    </div>
  );
}
