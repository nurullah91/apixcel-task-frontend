import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { HeartFilledIcon, Logo } from "@/src/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">APIXcel</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/dashboard"}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Dashboard
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="flex md:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/dashboard"}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Dashboard
          </Button>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
