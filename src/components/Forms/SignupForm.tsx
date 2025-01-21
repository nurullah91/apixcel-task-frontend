"use client";
//import { redirect } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { signupSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";
import { useSignUpMutation } from "@/src/redux/api/userApi";
import { verifyJWT } from "@/src/utils/verifyJWT";
import { TUser } from "@/src/types";
import { setUser } from "@/src/redux/authSlice";
import { useAppDispatch } from "@/src/redux/store";
import { Link } from "@heroui/link";
export interface ILoginFormProps {}
export default function SignupForm({}: ILoginFormProps) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [signUpUser, { isLoading }] = useSignUpMutation();

  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await signUpUser(data);

      if (res.data.data.accessToken) {
        const user = verifyJWT(res.data?.data?.accessToken) as TUser;

        dispatch(setUser({ user: user, token: res?.data?.data?.accessToken }));

        if (user.role === "admin") {
          toast.success(res.data.message, { id: toastId });

          router.push("/dashboard");
        } else {
          toast.success(res.data.message, { id: toastId });
          router.push("/");
        }
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <CustomForm resolver={zodResolver(signupSchema)} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="relative">
            <CustomInput
              required
              label="Password"
              name="password"
              type={`${show ? "text" : "password"}`}
            />
            <button
              type="button"
              className="absolute bottom-5 right-2"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            <CustomInput required label="Name" name="name" />
          </div>
          <div className="lg:col-span-2">
            <CustomInput required label="Email" name="email" type="email" />
          </div>
          <div className="lg:col-span-2">
            <CustomInput required label="Phone" name="phone" />
          </div>
          <div className="lg:col-span-2">
            <CustomInput required label="Address" name="address" />
          </div>
        </div>
        <Button
          className="mt-3"
          isDisabled={isLoading}
          radius="sm"
          size="sm"
          type="submit"
          fullWidth
          color="primary"
        >
          {isLoading ? "Loading..." : "Signup"}
        </Button>
      </CustomForm>
      <p className="text-sm">
        Already Have an account? <Link href="/login">login</Link>
      </p>
    </div>
  );
}
