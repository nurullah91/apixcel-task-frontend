"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { forgetPasswordSchema } from "@/src/schema";
import { useEffect, useState } from "react";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";

export interface IForgetPasswordFormProps {}
export default function ForgetPasswordForm({}: IForgetPasswordFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //   useEffect(() => {
  //     if (data && !data?.success) {
  //       toast.error(data?.message as string);
  //     } else if (data && data?.success) {
  //       toast.success(data.message);
  //     }
  //   }, [data]);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // handleEmailSend(JSON.stringify(data));
    console.log(data);
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
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isPending ? "Sending..." : "Send Email"}
        </Button>
      </CustomForm>
      <div>
        {!isPending && isSuccess && (
          <p className="text-red-500 text-xs my-2">
            An email sent to your email with reset password link
          </p>
        )}
      </div>
    </div>
  );
}
