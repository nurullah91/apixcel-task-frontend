"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

import { resetPasswordSchema } from "@/src/schema";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";
import { useResetPasswordMutation } from "@/src/redux/api/userApi";
export interface IResetPasswordFormProps {}
export default function ResetPasswordForm({}: IResetPasswordFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const userId = searchParams.get("id");
  const token = searchParams.get("resetToken");
  const [resetPass, { isLoading }] = useResetPasswordMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const resetPasswordData = {
      ...data,
      userId,
    };

    try {
      const res = await resetPass({ resetPasswordData, token });

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });

        router.push("/login");
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
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
          isDisabled={isLoading}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isLoading ? "Loading..." : "Reset password"}
        </Button>
      </CustomForm>
    </div>
  );
}
