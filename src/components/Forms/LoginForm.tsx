"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "@heroui/link";
import CustomForm from "./CustomFrom";
import CustomInput from "./CustomInput";
import { loginSchema } from "@/src/schema";
import { useLoginMutation } from "@/src/redux/api/userApi";
import { TUser } from "@/src/types";
import { verifyJWT } from "@/src/utils/verifyJWT";
import { useAppDispatch } from "@/src/redux/store";
import { setUser } from "@/src/redux/authSlice";

export interface ILoginFormProps {}
export default function LoginForm({}: ILoginFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const [loginUser] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await loginUser(data);

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
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <CustomForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <CustomInput required label="Email" name="email" type="email" />
        <div className="relative">
          <CustomInput
            required
            label="Password"
            name="password"
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
        <p className="mt-1">
          <Link
            href="/forget-password"
            className="text-sm font-bold hover:underline"
          >
            Forget Password?
          </Link>
        </p>

        <Button
          className="mt-2"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
          fullWidth
          color="primary"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </CustomForm>
    </div>
  );
}
