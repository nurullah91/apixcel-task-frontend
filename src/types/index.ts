import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "user";
  phone: string;
  address: string;
  profilePhoto?: string;
  coverPhoto?: string;
  passwordChangedAt?: Date;
  status: "active" | "blocked";
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
