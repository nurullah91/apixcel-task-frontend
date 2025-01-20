"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { resetPasswordSchema } from "@/src/schema";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";
export interface IResetPasswordFormProps {}
export default function ResetPasswordForm({}: IResetPasswordFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const userId = searchParams.get("id");
  const resetToken = searchParams.get("resetToken");

  const [isPending, setIsPending] = useState(false);

  // useEffect(() => {
  //   if (data && data?.success) {
  //     toast.success(data.message);
  //     router.push("/login");
  //   } else if (data && !data?.success) {
  //     toast.error(data?.message as string);
  //   }
  // }, [data]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const resetPasswordData = {
      ...data,
      userId,
    };

    // handleReset(JSON.stringify(resetPasswordData));
    console.log(data);
  };

  return (
    <div>
      <CustomForm
        onSubmit={handleSubmit}
        resolver={zodResolver(resetPasswordSchema)}
      >
        <div className="relative">
          <CustomInput
            required
            label="New Password"
            name="newPassword"
            type={`${show ? "text" : "password"}`}
          />

          <button
            type="button"
            className="absolute top-5 right-2"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <Button
          className="mt-3"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isPending ? "Loading..." : "Reset password"}
        </Button>
      </CustomForm>
    </div>
  );
}
