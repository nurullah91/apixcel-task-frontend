"use client";
import { useRouter } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { changePasswordSchema } from "@/src/schema";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/src/redux/api/userApi";
import { useAppDispatch } from "@/src/redux/store";
import { logout } from "@/src/redux/authSlice";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [resetPass, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await resetPass(data);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        dispatch(logout());
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
        resolver={zodResolver(changePasswordSchema)}
      >
        <CustomInput
          required
          label="Old Password"
          name="oldPassword"
          type="text"
        />
        <CustomInput
          required
          label="New Password"
          name="newPassword"
          type="text"
        />
        <Button
          className="mt-3"
          isDisabled={isLoading}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isLoading ? "Loading..." : "Change password"}
        </Button>
      </CustomForm>
    </div>
  );
}
