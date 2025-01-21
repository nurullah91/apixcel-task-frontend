"use client";

import { toast } from "sonner";
import { logout, useCurrentUser } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Button } from "@heroui/button";
import Link from "next/link";
import { HeartFilledIcon } from "./icons";
import { usePathname, useRouter } from "next/navigation";

export interface INavbarButtonProps {}
export default function NavbarButton({}: INavbarButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const protectedRoutes = ["/dashboard", "/dashboard/add-project"];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout success");
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex gap-2 items-center">
          {" "}
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/dashboard"}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Dashboard
          </Button>
          <button
            className="text-sm font-normal text-default-600 bg-default-100 px-4 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <Button
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100"
          href={"/login"}
          variant="flat"
        >
          Login
        </Button>
      )}
    </div>
  );
}
