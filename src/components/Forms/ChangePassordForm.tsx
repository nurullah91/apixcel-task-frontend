"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { changePasswordSchema } from "@/src/schema";
import { useState } from "react";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";

export default function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // handleChangePassword(JSON.stringify(data));
    // userLoading(true);
    console.log(data);
  };

  //   if (!isPending && isSuccess) {
  //     if (redirect) {
  //       router.push(redirect);
  //     } else {
  //       router.push("/");
  //     }
  //   }

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
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
        >
          {isPending ? "Loading..." : "Change password"}
        </Button>
      </CustomForm>
    </div>
  );
}
